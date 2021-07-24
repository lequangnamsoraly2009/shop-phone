const router = require("express").Router();
const paymentController = require("../controllers/payment.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/payment")
  .post(auth, paymentController.createPayment);

router
  .route("/admin/payment")
  .get(auth, authAdmin, paymentController.getPayments)

  module.exports = router;