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
  getAllVoucher: ({ token }) => {
    return API.get(`/api/voucher`, {
      headers: { Authorization: token },
    });
  },
};

export default VoucherAPI;
