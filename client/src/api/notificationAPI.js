import API from "./axiosClient";

const NotificationAPI = {
  getNotificationForUser: ({ token }) => {
    return API.get("/api/notification/user", {
      headers: { Authorization: token },
    });
  },
  getNotificationForAdmin: ({ token }) => {
    return API.get("/api/notification/admin", {
      headers: { Authorization: token },
    });
  },
  createNotification: ({
    token,
    notification,
    contentNotification,
    userSend,
    typeNotification,
    hasSeen,
  }) => {
    return API.post(
      "/api/notification",
      {
        notification,
        contentNotification,
        userSend,
        typeNotification,
        hasSeen,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  deleteNotification: ({token, idNotification}) => {
    return API.delete(`/api/notification/${idNotification}`, {
        headers: { Authorization: token },
      });
  }
};

export default NotificationAPI;
