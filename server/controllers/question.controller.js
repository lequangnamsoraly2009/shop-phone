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
  // Get data question for one product
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
        questions: questions,
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  //Count Like and count dislike
  handleLikeQuestion: async (req, res) => {
    try {
      const question = await QuestionProducts.findById({ _id: req.params.id });
      if (!question) {
        return res
          .status(400)
          .json({ status: false, message: "This question is not exist!" });
      }

      const { like, userLike } = question;

      const { userUID } = req.body;

      // Check user has like ?
      const isUserHasLike = userLike.every((user) => user.userId !== userUID);
      // if isUserHasLike=false => has like -> opposite -> hasn't like
      let handleLike;
      if (isUserHasLike === false) {
        let userHasLike = question.userLike.find(
          (user) => user.userId === userUID
        );
        if (userHasLike.isLike === true) {
          userHasLike = {
            userId: userUID,
            isLike: false,
          };
          handleLike = like - 1;
          await QuestionProducts.findOneAndUpdate(
            { _id: req.params.id },
            { like: handleLike, userLike: userHasLike }
          );
        } else {
          userHasLike = {
            userId: userUID,
            isLike: true,
          };
          handleLike = like + 1;
          await QuestionProducts.findOneAndUpdate(
            { _id: req.params.id },
            { like: handleLike, userLike: userHasLike }
          );
        }
      } else {
        let userHasLike = {
          userId,
          isLike: true,
        };
        handleLike = like + 1;
        await QuestionProducts.findOneAndUpdate(
          { _id: req.params.id },
          { like: handleLike, userLike: userHasLike }
        );
      }
      res.json({ status: "success", message: "Update like successfully!" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  handleDisLikeQuestion: async (req, res) => {},

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
      const questionPending = await PendingQuestionProducts.findById(
        req.params.id
      );
      const { replyQuestion, questionCreatedAt } = req.body;

      const { userName, product_id, status, question } = questionPending;

      if (!questionPending) {
        return res
          .status(400)
          .json({ status: false, message: "Question is not exist !" });
      }

      const newQuestionRoot = new QuestionProducts({
        userName,
        product_id,
        question,
        reply: replyQuestion,
        questionCreatedAt,
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
