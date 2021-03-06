import API from "./axiosClient";

const UserAPI = {
  getUserLogin: (token) => {
    return API.get("/users/infor", {
      headers: { Authorization: token },
    });
  },
  getAllAdminUsers: ({ searchUsers, token }) => {
    return API.get(`/users/all_users?limit&&&email[regex]=${searchUsers}`, {
      headers: { Authorization: token },
    });
  },
  getAllUsers: ({ token, searchUsers }) => {
    return API.get(`/users/all_users_1?email[regex]=${searchUsers}`, {
      headers: { Authorization: token },
    });
  },
  getUsersPagination: ({ searchUsers, page, token }) => {
    return API.get(
      `/users/all_users?limit=${page * 11}&&&email[regex]=${searchUsers}`,
      {
        headers: { Authorization: token },
      }
    );
  },
  saveVoucher: ({ token, voucher }) => {
    return API.patch(
      `/users/save_voucher`,
      {
        voucher,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  deleteVoucherSave: ({ token, voucher }) => {
    return API.patch(
      `/users/delete_voucher`,
      {
        voucher,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  changeTypeUser: ({ token, idUserChange, typeUserChange }) => {
    return API.patch(
      `/users/change_type`,
      {
        idUserChange,
        typeUserChange,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  deleteAvatarCloud: ({ public_id, token, userId }) => {
    return API.post(
      "/users/delete-avatar",
      { public_id: public_id, userId: userId },
      {
        headers: { Authorization: token },
      }
    );
  },
  changeAvatarUser: ({ avatar,user, token }) => {
    return API.patch(
      "/users/change-avatar",
      { avatar, user },
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default UserAPI;
