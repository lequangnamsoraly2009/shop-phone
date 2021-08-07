const Payments = require("../models/payment.model");
const Users = require("../models/user.model");
const Products = require("../models/product.model");

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

const paymentController = {
  getPayments: async (req, res) => {
    try {
      const features = new APIfeatures(Payments.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      const payments = await features.query;
      res.json({
        status: "success",
        result: payments.length,
        payments: payments,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getFilterDatePayments: async (req, res) => {
    try {
      const { monthFilter } = req.body;

      if (monthFilter === 12) {
        const filterPayments = await Payments.find({
          createdAt: {
            $gte: `2021-${monthFilter}-01`,
            $lte: `2021-${monthFilter}-31`,
          },
        });
        res.json({
          status: "success",
          result: filterPayments.length,
          filterPayments: filterPayments,
        });
      } else {
        const filterPayments = await Payments.find({
          createdAt: {
            $gte: `2021-${monthFilter}-01`,
            $lt: `2021-${monthFilter + 1}-01`,
          },
        });
        res.json({
          status: "success",
          result: filterPayments.length,
          filterPayments: filterPayments,
        });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User does not exist !" });

      const { cart, paymentID, address, phone, notes } = req.body;
      const { _id, name, email } = user;

      cart.filter((item) => {
        return countSoldAndStorage(
          item._id,
          item.quantity,
          item.numberSold,
          item.storage
        );
      });

      const newPayment = new Payments({
        user_id: _id,
        name: address.recipient_name,
        email,
        paymentID,
        cart,
        phone,
        address,
        notes,
        key: _id,
      });
      // console.log(newPayment);
      await newPayment.save();

      res.json({ message: "Payment successful" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

const countSoldAndStorage = async (id, quantity, oldSold, oldStorage) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      numberSold: quantity + oldSold,
      storage: oldStorage - quantity,
    }
  );
};


module.exports = paymentController;
