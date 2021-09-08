const router = require("express").Router();
const notificationController = require("../controllers/notification.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/notification").post(auth, notificationController.createNotification);
router.route("/notification/user").get(auth, notificationController.getNotificationForUser);
router.route("/notification/admin").get(auth, notificationController.getNotificationForAdmin);

router.route("/notification/:id").delete(auth, notificationController.deleteNotification);


module.exports = router;
