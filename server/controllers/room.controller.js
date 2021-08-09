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
};

module.exports = userController;
