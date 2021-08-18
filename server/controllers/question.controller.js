const QuestionProducts = require("../models/questionProduct.model");
const PendingQuestionProducts = require("../models/pendingQuestion.model");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const questionProductController = {
  getAllQuestionsForProduct: async (req, res) => {
    try {
      const features = new APIfeatures(
        QuestionProducts.find({ product_id: req.params.id }),
        req.query
      )
        .sorting()
        .paginating();

      const questions = await features.query;

      if (!questions) {
        return res
          .status(400)
          .json({ status: false, message: "This product haven't question" });
      }
      res.json({
        status: "success",
        result: questions.length,
        question: questions,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getAllPendingQuestionsForAdmin: async (req, res) => {
    try {
      const features = new APIfeatures(
        PendingQuestionProducts.find(),
        req.query
      )
        .sorting()
        .paginating();
      const pendingQuestions = await features.query;
      res.json({
        status: "success",
        result: pendingQuestions.length,
        pendingQuestions: pendingQuestions,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  createPendingQuestion: async (req, res) => {
    try {
      const { userName, product_id, question } = req.body;
      const newPendingQuestion = new PendingQuestionProducts({
        userName,
        product_id,
        question,
      });
      await newPendingQuestion.save();
      res.json({ message: "Created a question successfully !!" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  deletePendingQuestion: async (req, res) => {
    try {
      await PendingQuestionProducts.findByIdAndDelete(req.params.id);

      res.json({ message: "Deleted a pending question successfully !!" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  confirmPendingQuestion: async (req, res) => {
    try {
      const { question_id, replyQuestion } = req.body;

      const questionPending = await PendingQuestionProducts.findById({
        _id: question_id,
      });

      const { userName, product_id, status, question } = questionPending;

      if (!questionPending) {
        return res
          .status(404)
          .json({ status: false, message: "Question is not exist !" });
      }

      const newStatus = "";

      if (status === "uncomfirmed") {
        newStatus = "confirmed";
      }

      const newQuestionRoot = new QuestionProducts({
        userName,
        product_id,
        status: newStatus,
        question,
        reply: replyQuestion,
      });

      await newQuestionRoot.save();
      await questionPending.remove();

      res.json({ status: true, message: "Question has been confirmed !" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = questionProductController;
