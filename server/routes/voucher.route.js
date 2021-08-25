const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const voucherController = require("../controllers/voucher.controller");

router.route("/voucher").get(auth, voucherController.getVoucher);
router.route("/voucher").post(auth, voucherController.createVoucher);
// router.route("/voucher/:id").get(auth, voucherController.getVoucher);
router.route("/voucher/:id").put(auth, voucherController.updateVoucher);
router.route("/voucher/:id").delete(auth, voucherController.deleteVoucher);


module.exports = router;
