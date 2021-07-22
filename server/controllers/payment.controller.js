const Payments = require("../models/payment.model");
const Users = require("../models/user.model");
const Products = require("../models/product.model");

const paymentController = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res
          .status(400)
          .json({ status: false, message: "User does not exist !" });

      const { cart, paymentID, address, phone, notes } = req.body;
      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        paymentID,
        cart,
        phone,
        address,
        notes,
      });
      console.log(newPayment);
      res.json({ newPayment });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = paymentController;
