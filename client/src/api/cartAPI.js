import API from "./axiosClient";

const CartAPI = {
  getCartUser: (token) => {
    return API.get("/users/infor", {
      headers: { Authorization: token },
    });
  },
};

export default CartAPI;
