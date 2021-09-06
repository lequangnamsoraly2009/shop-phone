const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
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
    picture:{
      type: String,
      default: ""
    },
    password: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: true,
      default: "Unknown"
    },
    phone: {
      type: String,
      default: ""
    },
    prefix: {
      type: String,
      default: ""
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
      default: ""
    },
    typeUser:{
      type: String,
      default: "Unconfimred"
    },
    resultDevice:{
      type: Object,
      default: {}
    },
    methodLogin:{
      type: Number,
      default: 1
    },
    vouchersSave:{
      type: Array,
      default: []
    },
    avatar: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
