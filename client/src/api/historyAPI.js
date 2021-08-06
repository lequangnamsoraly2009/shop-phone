import API from "./axiosClient";

const HistoryAPI = {
  getHistoryCustomer: (token) => {
    return API.get("/users/history", {
      headers: { Authorization: token },
    });
  },
};

export default HistoryAPI;
