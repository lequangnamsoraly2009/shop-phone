import API from "./axiosClient";

const UserAPI = {
  getUserLogin: (token) => {
    return API.get("/users/infor", {
      headers: { Authorization: token },
    });
  },
  getAllAdminUsers: ({searchUsers}, token) => {
    return API.get(
      `/users/all_users?limit=&&&email[regex]=${searchUsers}`,
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default UserAPI;
