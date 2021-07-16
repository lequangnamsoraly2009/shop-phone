const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Stocking", "OutStocking", "Importing"],
    default: "Stocking",
  },
  color: {
    type: String,
    trim: true,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
    default: false,
  },
  numberSold: {
    type: Number,
    default: 0,
  },
  storage: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", productSchema);
