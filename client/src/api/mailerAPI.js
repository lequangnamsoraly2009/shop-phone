import API from "./axiosClient";

const MailerAPI = {
  sendReceiptMail: ({ token, user, detailPayment }) => {
    return API.post(
      `/api/payment_receipt`,
      { user, detailPayment },
      {
        headers: { Authorization: token },
      }
    );
  },
};

export default MailerAPI;
