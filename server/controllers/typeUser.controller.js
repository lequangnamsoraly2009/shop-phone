const Users = require("../models/user.model");

const typeUserController = {
  changeTypeUser: async (req, res) => {
    try {
      const { typeUserChange, idUserChange } = req.body;

      const user = await Users.findByIdAndUpdate(
        { _id: idUserChange },
        {
          typeUser: typeUserChange,
        }
      );
      res.json({status: true, message: "Change type user successfully"})
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = typeUserController;
