const router = require("express").Router();
const questionProductController = require("../controllers/question.controller");

router.get(
  "/questions/:id",
  questionProductController.getAllQuestionsForProduct
);

router.post(
    "/questions",
    questionProductController.getAllQuestionsForProduct
  );
router.post("/active_question");

module.exports = router;
