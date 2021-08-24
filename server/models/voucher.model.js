const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema(
  {
    voucherName: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    valueCode: {
      type: Number,
      required: true,
      default: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    numberCode: {
      type: Number,
      required: true,
      default: 1000,
    },
    numberCodeRemain: {
      type: Number,
      required: true,
      default: 1000,
    },
    status: {
      type: String,
      required: true,
      default: "Public"
    },
    userUsed: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vouchers", voucherSchema);
