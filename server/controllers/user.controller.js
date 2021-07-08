const Users = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Generator 1 regex
const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);

const userController = {
  register: async (req, res) => {
    try {
      const { userName, email, password, passwordConfirm } = req.body;

      const user = await Users.findOne({ email: email });

      if (user)
        return res
          .status(400)
          .json({ status: false, message: "Your Email already exists!" });

      if (password !== passwordConfirm)
        return res
          .status(400)
          .json({ status: false, message: "Password compare is incorrect!" });

      // Check Validate For Passwords

      if (regex.test(password) === false)
        return res
          .status(400)
          .json({
            status: false,
            message:
              "Password has at least 6 characters including at least 1 letter and 1 number",
          });

        //  Validate Password 
        const passwordHash = await bcrypt.hash(password,10);

        const newUser = new Users({
            userName,email, password: passwordHash
        })

        await newUser.save();

        // Create jsonwebtoken to authentication

        const accessToken = createAccessToken({id: newUser._id})
        const refreshToken = createRefreshToken({id: newUser._id})

        res.cookie("refreshToken", refreshToken , {
            httpOnly: true,
            path: "/users/refresh_token"
        })

        res.json({accessToken})

    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  refreshToken: async(req,res)=>{
    try {
      const rf_token = req.cookies.refreshToken;
      if(!rf_token) return res.status(400).json({ status: false, message: "Please login or register"})
        
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
          if(err) return res.status(400).json({ status: false, message: "Please login or register"})
          const accessToken = createAccessToken({id: user.id})
          res.json({accessToken})
      })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }

}
};

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userController;
