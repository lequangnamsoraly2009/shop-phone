const Users = require("../models/user.model");
const PendingUsers = require("../models/pendingUser.model");
const Payments = require("../models/payment.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendResetPasswordEmail,
} = require("../helper/mailer.helper");

// Generator 1 regex
const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((element) => delete queryObj[element]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query =
        this.query.sort("-createdAt") && this.query.sort("-updatedAt");
    }
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const userController = {
  // Admin Used
  getAllUsers: async (req, res) => {
    try {
      const features = new APIfeatures(Users.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      const users = await features.query;
      res.json({
        status: "success",
        result: users.length,
        users: users,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
  // User Used
  register: async (req, res) => {
    try {
      const { userName, email, password, gender, phone, prefix } = req.body;

      const user = await Users.findOne({ email });
      const pendingUser = await PendingUsers.findOne({ email });

      if (user || pendingUser) {
        return res
          .status(400)
          .json({ status: false, message: "Your Email already exists!" });
      }

      if (phone.length <= 9 || phone.length > 11) {
        return res.status(400).json({
          status: false,
          message: "Phone Number required 10 and 11 numbers",
        });
      }
      // Check Validate For Passwords

      if (regex.test(password) === false)
        return res.status(400).json({
          status: false,
          message:
            "Password has at least 6 characters including at least 1 letter and 1 number",
        });

      //  Validate Password
      const passwordHash = await bcrypt.hash(password, 11);

      const newUser = new PendingUsers({
        userName,
        email,
        password: passwordHash,
        gender,
        prefix,
        phone,
      });

      await newUser.save();
      await sendConfirmationEmail({ toUser: newUser, hash: newUser._id });
      res.json({ ok: true });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ status: false, message: "User invalid" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ status: false, message: "Incorrect Password" });

      // Login successful, create access token and refresh token

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/users/refresh_token",
      });

      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  activateUser: async (req, res) => {
    try {
      const hash = req.body;
      const user = await PendingUsers.findOne({ _id: hash.id });
      if (!user) {
        return res
          .status(400)
          .json({ status: false, message: "User cannot be actived" });
      }
      const newUser = new Users({
        userName: user.userName,
        email: user.email,
        password: user.password,
        gender: user.gender,
        prefix: user.prefix,
        phone: user.phone,
      });

      await newUser.save();
      await user.remove();

      res.json({ message: `User ${user.userName} has been activated` });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User does not exist" });

      const newPassword =
        Math.random().toString(36).substring(2, 5) +
        Math.random().toString(36).substring(2, 5);

      await sendResetPasswordEmail({ toUser: user, newPassword: newPassword });

      // hash passwords
      const passwordHash = await bcrypt.hash(newPassword, 11);

      await Users.findOneAndUpdate(
        { email: email },
        { password: passwordHash }
      );
      res.json("Change Password Success");
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: "/users/refresh_token" });

      return res.json({ status: true, message: "Logout success" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      // console.log(rf_token)
      if (!rf_token)
        return res
          .status(400)
          .json({ status: false, message: "Please login or register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res
            .status(400)
            .json({ status: false, message: "Please login or register" });
        const accessToken = createAccessToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  inforUser: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id }).select(
        "-password"
      );

      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User does not exist !" });

      res.json(user);
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  updateInforUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User does not exist" });
      const { name, phone, email, age, introduction } = req.body;

      if (email !== user.email) {
        const currentEmail = await Users.findOne({ email: email });

        if (currentEmail)
          return res
            .status(400)
            .json({ status: false, message: "Email already in use !" });
      }

      if (phone.length < 9 || phone.length > 11) {
        return res
          .status(400)
          .json({ status: false, message: "Incorrect phone number" });
      }

      if (name.length < 5 || name.length > 12) {
        return res.status(400).json({
          status: false,
          message: "Name User Has required 5 to 12 characters",
        });
      }

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          userName: name,
          phone,
          email,
          age,
          introduction,
        }
      );
      res.json("Update User Success");
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User does not exist" });
      const { newPassword, oldPassword } = req.body;
      // Check validate compare Passwords
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ status: false, message: "Incorrect Password" });

      if (regex.test(newPassword) === false)
        return res.status(400).json({
          status: false,
          message:
            "Password has at least 6 characters including at least 1 letter and 1 number",
        });

      //  Validate Password
      const passwordHash = await bcrypt.hash(newPassword, 11);

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        { password: passwordHash }
      );
      res.json("Change Password Success");
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User does not exist" });
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
      return res.json({ message: "Added to cart" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  historyOrder: async (req, res) => {
    try {
      const history = await Payments.find({ user_id: req.user.id });

      res.json(history);
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  detectDevice: async (req, res) => {
    try {
      const useragent = req.useragent;
      const deviceResult = req.device;
      res.json({ useragent, deviceResult });
    } catch (error) {
      return res.status(500).json({ status: false, message: error });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userController;
