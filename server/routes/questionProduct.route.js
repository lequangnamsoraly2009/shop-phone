const router = require("express").Router();
const questionProductController = require("../controllers/question.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get(
  "/questions/:id",
  questionProductController.getAllQuestionsForProduct
);

router
  .route("/pending_questions")
  .get(
    auth,
    authAdmin,
    questionProductController.getAllPendingQuestionsForAdmin
  );
router
  .route("/pending_questions/:id")
  .delete(auth, authAdmin, questionProductController.deletePendingQuestion);

router
  .route("/questions")
  .post(auth, questionProductController.createPendingQuestion);
router
  .route("/confirm_question/:id")
  .post(auth, authAdmin, questionProductController.confirmPendingQuestion);

module.exports = router;
