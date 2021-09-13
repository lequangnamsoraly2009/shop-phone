const router = require("express").Router();
const notificationController = require("../controllers/notification.controller");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/notification").post(auth, notificationController.createNotification);
router.route("/notification/user").get(auth, notificationController.getNotificationForUser);
router.route("/notification/admin").get(auth, authAdmin,notificationController.getNotificationForAdmin);

router.route("/notification/:id").delete(auth, notificationController.deleteNotification);
router.route("/notification/user/:id").patch(auth, notificationController.sendOneUserNotification);
router.route("/notification/alluser/:id").patch(auth, notificationController.sendAllNotification);


module.exports = router;
