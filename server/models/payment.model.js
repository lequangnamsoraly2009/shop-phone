const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
    },
    paymentID: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    notes: {
      type: String,
    },
    key:{
      type: String,
    },
    methodPayment:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payments", paymentSchema);
