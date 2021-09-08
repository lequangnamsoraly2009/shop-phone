const Notifications = require("../models/notification.model");

class APIfeatures {
  constructor(query) {
    this.query = query;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
}

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
        userId: userSend._id,
        typeNotification,
        hasSeen,
      });

      await newNotification.save();

      res.json({ status: "success", message: "Create Notification Successful" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getNotificationForUser: async (req, res) => {
      try {
        const features = new APIfeatures(Notifications.find({userId: req.user.id})).sorting()

        const notifications = await features.query;

        res.json({
            status: "success",
            result: notifications.length,
            notifications: notifications,
          });

      } catch (error) {
          return res.status(500).json({ status: false, message: error.message });
      }
  },
  getNotificationForAdmin: async (req, res) => {},
  deleteNotification: async (req, res) => {
    try {
      await Notifications.findByIdAndDelete({ _id: req.params.id });
      res.json({ status: "success", message: "Delete Notification successfully" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = notificationController;
