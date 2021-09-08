const Notifications = require("../models/notification.model")

const notificationController = {
  createNotification: async (req, res) => {
    try {
      const {
        notification,
        contentNotification,
        userSend,
        typeNotification,
        hasSeen,
      } = req.body;

    //   Nếu user or admin > 10 notification -> delete notification cũ nhất

      const newNotification = new Notifications({
        notification,
        contentNotification,
        userSend,
        typeNotification,
        hasSeen,
      })

      await newNotification.save();

      res.json({status: true, message: "Create Notification Successful"});

    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getNotificationForUser: async (req, res) => {},
  getNotificationForAdmin: async (req, res) => {},
  deleteNotification: async (req, res) => {
    try {
        await Notifications.findByIdAndDelete({_id: req.params.id})
        res.json({ status: true, message:"Delete Notification successfully"})
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
  }
};

module.exports = notificationController;
