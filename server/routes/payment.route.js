const router = require("express").Router();
const paymentController = require("../controllers/payment.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/payment")
  .post(auth, paymentController.createPayment);

router
  .route("/admin/payment")
  .get(auth, paymentController.getPayments)
  // Đã xóa tạm thằng middleware admin ra để nó đỡ load 2 lần

  module.exports = router;