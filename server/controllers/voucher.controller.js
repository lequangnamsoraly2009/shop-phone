const Vouchers = require("../models/voucher.model");

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

const voucherController = {
  getAllVoucher: async (req, res) => {},
  //   getVoucher: async (req, res) => {},
  createVoucher: async (req, res) => {
    try {
      const { voucherName, valueCode, expiryDate, numberCode } = req.body;
      const voucher = await Vouchers.findOne({ voucherName });
      //   Check voucher exist
      if (voucher) {
        return res
          .status(400)
          .json({ status: false, message: "This voucher already exists !" });
      }

      //   create New Voucher
      const newVoucher = new Vouchers({
        voucherName: voucherName.toUpperCase(),
        valueCode,
        expiryDate,
        numberCode,
        numberCodeRemain: numberCode,
      });
      await newVoucher.save();
      res.json("Create success a voucher");
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  updateVoucher: async (req, res) => {},
  deleteVoucher: async (req, res) => {},
};

module.exports = voucherController;
