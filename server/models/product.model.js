const mongoose = require('mongoose');

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
    type: ["Stocking", "OutStocking","Importing"],
    trim: true,
    default: "Stocking",
    required: true,
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
  },
  numberSold: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Products", productSchema);
