const Rooms = require("../models/room.model");
const Users = require("../models/user.model");

const roomController = {
  getRooms: async (req, res) => {
    try {
      const rooms = await Rooms.find();
      res.json({ status: "success", results: rooms.length, rooms: rooms });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  getRoomByUserID: async (req, res) => {
    try {
      const { userId } = req.body;

      const user = await Users.findById({ _id: userId });

      if (!user)
        return res
          .status(404)
          .json({ status: false, message: "User not found" });

      const roomOfUser = await Room.findOne({ userId: userId });

      res.json({ status: "success", roomOfUser: roomOfUser });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
  //   Tạo room cho user ngay sau khi đăng kí bằng account local hoặc đăng kí bằng google account
  createRoom: async (req, res) => {
    try {
    } catch (error) {}
  },
};

module.exports = userController;
