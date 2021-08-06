import API from "./axiosClient";

const PaymentAPI = {
  getAllPayments: (searchPayments, token) => {
    return API.get(
      `/api/admin/payment?limit=${1 * 20}&&&email[regex]=${searchPayments}`,
      {
        headers: { Authorization: token },
      }
    );
  },
    //   useEffect(() => {
    //     if (token && isAdmin === true) {
    //       const getAllPayments = async () => {
    //         const response = await API.get(
    //           `/api/admin/payment?limit=${1 * 20}&&&email[regex]=${searchPayments}`,
    //           {
    //             headers: { Authorization: token },
    //           }
    //         );
    //         dispatch(getPayments(response.data.payments.slice(0, 10)));
    //         dispatch(setPaginationPayments(response.data.payments));
    //       };
    //       getAllPayments();
    //     }
    //   }, [dispatch, searchPayments, token, isAdmin]);
};

export default PaymentAPI;
