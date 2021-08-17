const router = require("express").Router();
const questionProductController = require("../controllers/question.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get(
  "/questions/:id",
  questionProductController.getAllQuestionsForProduct
);

router.get(
  "/pending_questions",
  questionProductController.getAllPendingQuestionsForAdmin
);

router
  .route("/questions")
  .post(auth, questionProductController.createPendingQuestion);
router.post(
  "/confirm_question",
  auth,
  authAdmin,
  questionProductController.confirmPendingQuestion
);

module.exports = router;
