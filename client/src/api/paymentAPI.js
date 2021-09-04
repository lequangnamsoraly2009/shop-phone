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
  getPaymentToDetail: ({ token, idPayment }) => {
    return API.post(
      `/api/payment_detail`,
      {
        idPayment,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  createPayment: ({
    token,
    cart,
    address,
    phone,
    notes,
    fullNameReceiver,
    emailReceiver,
    methodPayment,
    voucherValue,
    feeShipValue,
  }) => {
    return API.post(
      `/api/payment`,
      {
        cart,
        address,
        phone,
        notes,
        fullNameReceiver,
        methodPayment,
        emailReceiver,
        voucherValue,
        feeShipValue,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  changeStatusPayment: ({ token, _id, status }) => {
    return API.patch(
      `/api/payment/${_id}`,
      { status },
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default PaymentAPI;
