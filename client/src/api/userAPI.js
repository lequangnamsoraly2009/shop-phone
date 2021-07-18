import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { getUser, isAAdmin, isABuyer } from "../app/userSlice";

const UserAPI = () => {
  const { token } = useSelector((state) => state.token);
  const { loggedIn } = useSelector((state) => state.user);
  const [cart,setCart] = useState([])

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

   const addCartItem = (detailProduct) => {
    if(!loggedIn){
      Swal.fire({
        icon: "question",
        title: "Oops...",
        text: 'Please login or register to continue buying !!',
      });
    }
  };

  return {
    addCartItem: addCartItem,
  }

};

export default UserAPI;
