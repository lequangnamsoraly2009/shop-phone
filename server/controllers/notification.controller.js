const Notifications = require("../models/notification.model");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const notificationController = {
  createNotification: async (req, res) => {
    try {
      const { notification, contentNotification, userSend, typeNotification } =
        req.body;

      let userId = "";

      if (userSend === {}) {
        userId = userId;
      } else {
        userId = userSend._id;
      }

      //IDEA:   Nếu user or admin > 10 notification -> delete notification cũ nhất

      const newNotification = new Notifications({
        notification,
        contentNotification,
        userSend,
        userId: userId,
        typeNotification,
      });

      await newNotification.save();

      res.json({
        status: "success",
        message: "Create Notification Successful",
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getNotificationForUser: async (req, res) => {
    try {
      const features = new APIfeatures(
        Notifications.find({ userId: req.user.id }),
        req.query
      )
        .sorting()
        .pagination();

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
      const features = new APIfeatures(Notifications.find(), req.query)
        .sorting()
        .pagination();

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
  deleteNotification: async (req, res) => {
    try {
      await Notifications.findByIdAndDelete({ _id: req.params.id });
      res.json({
        status: "success",
        message: "Delete Notification successfully",
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  sendOneUserNotification: async (req, res) => {
    try {
      const { user, userSend } = req.body;

      const notification = await Notifications.findById({ _id: req.params.id });

      const { userReceive } = notification;

      const hasCheckUser = userReceive.some((u) => u._id === user._id);
    
      if (hasCheckUser === true) {
        return res
          .status(400)
          .json({ status: false, message: "User has send notification" });
      } else {
        const listUser = [...userReceive];
        listUser.push(user);
        await Notifications.findByIdAndUpdate(
          { _id: req.params.id },
          {
            userReceive: listUser,
            userSend: userSend,
            userId: userSend._id,
          }
        );

        res.json({
          status: "success",
          message: "Send notification Success",
        });
      }
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  sendAllNotification: async (req, res) => {
    try {
      const { listUser, userSend } = req.body;

      const notification = await Notifications.findById({ _id: req.params.id });

      if (notification.length > 0) {
        return res
          .status(400)
          .json({ status: false, message: "Change another ways" });
      }

      await Notifications.findByIdAndUpdate(
        { _id: req.params.id },
        {
          userReceive: listUser,
          userSend: userSend,
          userId: userSend._id,
        }
      );

      res.json({
        status: "success",
        message: "Send notification for all user has success",
      });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = notificationController;
