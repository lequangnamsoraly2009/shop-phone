const router = require("express").Router();
const reviewCommentController = require("../controllers/reviewComment.controller")


router.get("/review-comments/:id",reviewCommentController.getReviewComments)
router.get("/review-all-comments/:id",reviewCommentController.getAllReviewComments)


module.exports = router;