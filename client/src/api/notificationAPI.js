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
  }) => {
    return API.post(
      "/api/notification",
      {
        notification,
        contentNotification,
        userSend,
        typeNotification,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  deleteNotification: ({ token, idNotification }) => {
    return API.delete(`/api/notification/${idNotification}`, {
      headers: { Authorization: token },
    });
  },
  sendOneUserNotification: ({ token, user, userSend, idNotification }) => {
    return API.patch(
      `/api/notification/user/${idNotification}`,
      {
        user,
        userSend,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  sendAllNotification: ({ token, listUser, userSend, idNotification }) => {
    return API.patch(
      `/api/notification/alluser/${idNotification}`,
      {
        listUser,
        userSend,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default NotificationAPI;
