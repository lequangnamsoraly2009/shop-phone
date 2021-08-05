const router = require("express").Router();
const paymentController = require("../controllers/payment.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/payment").post(auth, paymentController.createPayment);
router.route("/create_payment_url").post(auth, paymentController.createPaymentByVNPay);
router.route("/vnpay_ipn").get(auth, paymentController.dataPaymentByVNPay);
router.route("/return_checksum").get(auth, paymentController.returnPaymentByVNPay);


router.route("/payment_filter").post(auth, paymentController.getFilterDatePayments);

router.get("/admin/payment", auth, authAdmin, paymentController.getPayments);

module.exports = router;
