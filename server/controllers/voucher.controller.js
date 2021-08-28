const Vouchers = require("../models/voucher.model");
const {
  sendGiftVouchersEMail
} = require("../helper/mailer.helper");

const voucherController = {
  getVoucher: async (req, res) => {
    try {
      const vouchers = await Vouchers.find();
      res.json({ vouchers });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  createVoucher: async (req, res) => {
    try {
      const { voucherName, valueCode, expiryDate, numberCode, status } =
        req.body;
      const voucher = await Vouchers.findOne({ voucherName: voucherName });
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
        status,
      });
      await newVoucher.save();
      res.json("Create success a voucher");
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  updateVoucher: async (req, res) => {
    try {
      const voucher = await Vouchers.findById(req.params.id);
      const { voucherName, valueCode, expiryDate, numberCode, status } =
        req.body;
      if (!voucher) {
        return res
          .status(400)
          .json({ status: false, message: "The voucher was not found" });
      }
      if (expiryDate === undefined || expiryDate === null) {
        return res
          .status(400)
          .json({ status: false, message: "Missing expiration date" });
      }

      await Vouchers.findByIdAndUpdate(
        { _id: req.params.id },
        {
          voucherName,
          valueCode,
          expiryDate,
          numberCode,
          numberCodeRemain: numberCode,
          status,
        }
      );
      res.json({ message: "Update voucher successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deleteVoucher: async (req, res) => {
    try {
      await Vouchers.findByIdAndDelete(req.params.id);
      res.json({ message: "Delete voucher successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  sendEmailGiftVoucher: async (req, res) => {
    try {
      const { user, voucher } = req.body;
      console.log(user, voucher);
      await sendGiftVouchersEMail({ toUser: user, voucher: voucher });
      res.json({status: true, message: "Send voucher successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = voucherController;
