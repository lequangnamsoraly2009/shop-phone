const mongoose = require("mongoose");

const pendingQuestionProductSchema = new mongoose.Schema(
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
      default: "uncomfirmed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PendingQuestionProducts",
  pendingQuestionProductSchema
);
