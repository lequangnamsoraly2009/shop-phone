const router = require("express").Router();
const notificationController = require("../controllers/notification.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/notification").post(auth, notificationController.createNotification);

module.exports = router;
