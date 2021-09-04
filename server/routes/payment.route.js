const router = require("express").Router();
const paymentController = require("../controllers/payment.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/payment").post(auth, paymentController.createPayment);

router.route("/payment/:id").patch(auth, paymentController.changeStatusPayment);

router.route("/payment_filter").post(auth, paymentController.getFilterDatePayments);

router.get("/admin/payment", auth, authAdmin, paymentController.getPayments);

module.exports = router;
