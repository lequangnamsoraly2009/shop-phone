

const UserAPI = {
  
  // useEffect(() => {
  //   if (token) {
  //     const getUserLogin = async () => {
  //       try {
  //         const response = await API.get("/users/infor", {
  //           headers: { Authorization: token },
  //         });
  //         // console.log(response);
  //         dispatch(getUser(response.data));

  //         (await response.data.role) === 0
  //           ? dispatch(isABuyer(true))
  //           : dispatch(isAAdmin(true));
  //         dispatch(getCartsPending());
  //         dispatch(getCarts(response.data.cart));
  //       } catch (error) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: `${error.response.data?.message}`,
  //         });
  //       }
  //     };
  //     getUserLogin();
  //   }
  // }, [token, dispatch]);

  // useEffect(() => {
  //   if (token) {
  //     const getHistoryCustomer = async () => {
  //       const response = await API.get("/users/history", {
  //         headers: { Authorization: token },
  //       });
  //       dispatch(getHistory(response.data));
  //     };
  //     getHistoryCustomer();
  //   }
  // }, [token, dispatch]);

  // // Get All Users For Admin
  // useEffect(() => {
  //   if (token && isAdmin === true) {
  //     const getUsers = async () => {
  //       const response = await API.get(
  //         `/users/all_users?limit=${1 * 20}&&&email[regex]=${searchUsers}`,
  //         {
  //           headers: { Authorization: token },
  //         }
  //       );
  //       const responseFilter = response.data.users.filter(
  //         (user) => user.role !== 1
  //       );
  //       dispatch(setPaginationUsers(responseFilter));
  //       dispatch(getAllUserDevices(responseFilter));
  //       dispatch(getAllUsers(responseFilter.slice(0, 10)));
  //     };
  //     getUsers();
  //   }
  // }, [dispatch, searchUsers, token, isAdmin]);
};

export default UserAPI;
