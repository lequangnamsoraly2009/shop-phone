const mongoose = require("mongoose");

const questionProductSchema = new mongoose.Schema(
  {
    userName: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuestionProducts", questionProductSchema);
