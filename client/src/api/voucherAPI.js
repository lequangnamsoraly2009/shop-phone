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
  deleteVoucher: ({ _id, token }) => {
    return API.delete(`/api/voucher/${_id}`, {
      headers: { Authorization: token },
    });
  },
  updateVoucher: ({
    _id,
    token,
    voucherName,
    valueCode,
    expiryDate,
    numberCode,
    status,
  }) => {
    return API.put(
      `/api/voucher/${_id}`,
      {
        voucherName,
        valueCode,
        expiryDate,
        numberCode,
        status,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  sendVoucher: ({ token, user, voucher }) => {
    return API.post(
      `/api/voucher/sendvoucher`,
      {
        user,
        voucher,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  updateVoucherRemain: ({ token, _id, user }) => {
    return API.patch(
      `/api/voucher/${_id}`,
      {
        user,
      },
      {
        headers: { Authorization: token },
      }
    );
  },
  checkVoucherUsed: ({ token, voucherId, user }) => {
    return API.post(
      `/api/voucher/check_voucher`,
      {
        user, 
        voucherId: voucherId
      },
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default VoucherAPI;
