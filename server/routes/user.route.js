const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const deviceMiddleware = require("../middleware/device");

router.post("/register", userController.register);
router.post("/login", userController.login);
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
router.get("/detect_device", auth, deviceMiddleware, userController.detectDevice);

module.exports = router;
