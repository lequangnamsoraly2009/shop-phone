import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { getUser, isAAdmin, isABuyer } from "../app/userSlice";
import { getCarts, getCartsPending } from "../app/cartSlice";
import { getHistory } from "../app/historySlice";

const UserAPI = () => {
  const { token } = useSelector((state) => state.token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const getUserLogin = async () => {
        try {
          const response = await axios.get("/users/infor", {
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
        const response = await axios.get("/users/history", {
          headers: { Authorization: token },
        });
        dispatch(getHistory(response.data));
      };
      getHistoryCustomer();
    }
  }, [token, dispatch]);
};

export default UserAPI;
