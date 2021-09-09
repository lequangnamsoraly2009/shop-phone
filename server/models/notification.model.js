const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    notification: {
        type: String,
        required: true,
    },
    contentNotification: {
        type: String,
        required: true,
    },
    userSend: {
        type: Object,
        required: true,
        default: {}
    },
    userReceive: {
        type: Array,
        required: true,
        default: []
    },
    userId:{
        type: String,
        required: true,
    },
    typeNotification: {
        type: String,
    },
    hasSeen: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationSchema);
