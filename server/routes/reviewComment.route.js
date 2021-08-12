const router = require("express").Router();
const reviewCommentController = require("../controllers/reviewComment.controller")


router.get("/review-comments/:id",reviewCommentController.getReviewComments)

module.exports = router;