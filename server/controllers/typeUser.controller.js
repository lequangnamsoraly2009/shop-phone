
const typeUserController = {
  changeTypeUser: async (req, res) => {
    try {
        const {typeUserChange} = req.body;
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = typeUserController;
