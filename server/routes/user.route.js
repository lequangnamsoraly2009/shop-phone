const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const deviceMiddleware = require("../middleware/device");
const typeUserController = require("../controllers/typeUser.controller");

router.post("/register", deviceMiddleware, userController.register);
router.post("/login", userController.login);
// Login with google credentials
router.post("/login_google", deviceMiddleware, userController.loginGoogle);

router.post("/activate", userController.activateUser);
router.patch("/reset_password", userController.resetPassword);
router.get("/logout", userController.logout);
router.post("/refresh_token", userController.refreshToken);
router.get("/infor", auth, userController.inforUser);
router.patch("/password", auth, userController.changePassword);
router.patch("/infor", auth, userController.updateInforUser);
router.patch("/addcart", auth, userController.addCart);
router.get("/history", auth, userController.historyOrder);
router.get("/all_users", auth, authAdmin, userController.getAllUsers);
router.get("/change_type", auth, authAdmin, typeUserController.changeTypeUser);

// All users not limit
router.get("/all_users_1", auth, authAdmin, userController.getAllUsers1);
router.get(
  "/detect_device",
  auth,
  deviceMiddleware,
  userController.detectDevice
);
// Save Voucher For User Here
router.patch("/save_voucher", auth, userController.saveVoucher);
router.patch("/delete_voucher", auth, userController.deleteVoucherUsed);

module.exports = router;
