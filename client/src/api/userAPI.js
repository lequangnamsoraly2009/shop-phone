import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
// import axios from "axios";
import { getUser, isAAdmin, isABuyer } from "../app/userSlice";
import { getCarts, getCartsPending } from "../app/cartSlice";
import { getHistory } from "../app/historySlice";
import API from "./axiosClient";
import { getAllUsers, setPaginationUsers } from "../app/userSlice.admin";

const UserAPI = () => {
  const { token } = useSelector((state) => state.token);
  const { searchUsers } = useSelector((state) => state.usersAdmin);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const getUserLogin = async () => {
        try {
          const response = await API.get("/users/infor", {
            headers: { Authorization: token },
          });
          // console.log(response);
          dispatch(getUser(response.data));

          (await response.data.role) === 0
            ? dispatch(isABuyer(true))
            : dispatch(isAAdmin(true));
          dispatch(getCartsPending());
          dispatch(getCarts(response.data.cart));
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data?.message}`,
          });
        }
      };
      getUserLogin();
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token) {
      const getHistoryCustomer = async () => {
        const response = await API.get("/users/history", {
          headers: { Authorization: token },
        });
        dispatch(getHistory(response.data));
      };
      getHistoryCustomer();
    }
  }, [token, dispatch]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await API.get(
        `/users/all_users?limit=${1 * 20}&&&email[regex]=${searchUsers}`,
        {
          headers: { Authorization: token },
        }
      );
      dispatch(getAllUsers(response.data.users));
      dispatch(setPaginationUsers(response.data.users));
    };
    getUsers();
  }, [dispatch, searchUsers,token]);
};

export default UserAPI;
