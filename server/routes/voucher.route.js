const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const voucherController = require("../controllers/voucher.controller");

router.route("/voucher").get(auth, voucherController.getVoucher);
router.route("/voucher").post(auth, voucherController.createVoucher);
router.route("/voucher/sendvoucher").post(auth, voucherController.sendEmailGiftVoucher);
router.route("/voucher/:id").put(auth, voucherController.updateVoucher);
router.route("/voucher/:id").patch(auth, voucherController.updateRemainVoucher);
router.route("/voucher/:id").delete(auth, voucherController.deleteVoucher);
router.route("/voucher/check_voucher").post(auth, voucherController.checkVoucherUsed);



module.exports = router;
