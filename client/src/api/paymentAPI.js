import API from "./axiosClient";

const PaymentAPI = {
  getAllPayments: ({ searchPayments, token }) => {
    return API.get(
      `/api/admin/payment?limit=&&&email[regex]=${searchPayments}`,
      {
        headers: { Authorization: token },
      }
    );
  },
  getPaymentsPagination: ({ searchPayments, page, token }) => {
    return API.get(
      `/api/admin/payment?limit=${page * 11}&&&email[regex]=${searchPayments}`,
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default PaymentAPI;
