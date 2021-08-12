const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema(
  {
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
    memory: {
      type: String,
      default: 64,
    },
    status: {
      type: String,
      enum: ["Stocking", "OutStocking", "Importing"],
      default: "Stocking",
    },
    color: {
      type: String,
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
    nameCategory: {
      type: String,
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
      default: 500,
    },
    sale: {
      type: Number,
      required: true,
      default: 0,
    },
    key: {
      type: String,
      default: uuidv4(),
      unique: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", productSchema);
