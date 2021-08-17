const router = require("express").Router();
const questionProductController = require("../controllers/question.controller");
const { auth } = require("../middleware/auth");

router.get(
  "/questions/:id",
  questionProductController.getAllQuestionsForProduct
);

router.get(
  "/pending_questions",
  questionProductController.getAllPendingQuestionsForAdmin
);

router.post(
  "/questions",
  auth,
  questionProductController.createPendingQuestion
);
router.post("/active_question");

module.exports = router;
