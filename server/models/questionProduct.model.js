const mongoose = require("mongoose");

const questionProductSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "confirmed",
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    reply: {
      type: Array,
    },
    questionCreatedAt: {
      type: String,
    },
    userLike: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuestionProducts", questionProductSchema);
