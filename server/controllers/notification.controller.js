const Notifications = require("../models/notification.model");

class APIfeatures {
  constructor(query,queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
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
        const features = new APIfeatures(Notifications.find({userId: req.user.id}), req.query).sorting().pagination();

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
  getNotificationForAdmin: async (req, res) => {
      try {
        const features = new APIfeatures(Notifications.find(), req.query).sorting().pagination();

        const notifications = await features.query;

        res.json({
            status: "success",
            result: notifications.length,
            notifications: notifications,
          });

      } catch (error) {
          return res.status(500).json({ status: false, message: error.message })
      }
  },
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
