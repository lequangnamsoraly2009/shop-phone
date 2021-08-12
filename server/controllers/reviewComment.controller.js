const ReviewComments = require("../models/reviewComment.model");

const reviewCommentController = {
  getReviewComments: async (req, res) => {
    try {
      const reviewComments = await ReviewComments.find({
        product_id: req.params.id,
      });
      res.json({ reviewComments });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = reviewCommentController;
