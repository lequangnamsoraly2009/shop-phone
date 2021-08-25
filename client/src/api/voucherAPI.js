import API from "./axiosClient";

const VoucherAPI = {
  createVoucher: ({
    token,
    expiryDate,
    numberCode,
    status,
    valueCode,
    voucherName,
  }) => {
    return API.post(
      `/api/voucher`,
      { expiryDate, numberCode, status, valueCode, voucherName },
      {
        headers: { Authorization: token },
      }
    );
  },
  getVoucher: ({ token }) => {
    return API.get(`/api/voucher`, {
      headers: { Authorization: token },
    });
  },
  deleteVoucher: ({_id,token}) => {
    return API.delete(
      `/api/voucher/${_id}`,
      {
        headers: { Authorization: token },
      }
    );
  }

};

export default VoucherAPI;
