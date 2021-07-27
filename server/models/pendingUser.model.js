const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },
    age: {
      type: Number,
      default: 18,
    },
    introduction: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PendingUsers", pendingUserSchema);
