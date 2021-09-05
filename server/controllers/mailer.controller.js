const { sendReceiptPayment } = require("../helper/mailer.helper");


const mailerController = {
  sendEmailReceipt: async (req, res) => {
    try {
      const { user, detailPayment } = req.body;

      const totalBillProduct = detailPayment.cart.reduce((item1, item2) => {
        return (
          item1 +
          item2.price * item2.quantity -
          ((item2.price * item2.quantity * item2.sale) / 100).toFixed(2)
        );
      }, 0);

      const totalBill = detailPayment.cart.reduce((item1, item2) => {
        return (
          item1 +
          item2.price * item2.quantity -
          ((item2.price * item2.quantity * item2.sale) / 100).toFixed(2)
        );
      }, detailPayment.feeShipValue - detailPayment.voucherValue);

      await sendReceiptPayment({
        toUser: user,
        detailPayment,
        totalBill,
        totalBillProduct,
      });
      res.json({ status: true, message: "Send email receipt success" });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = mailerController;
