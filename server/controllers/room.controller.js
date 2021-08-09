const Room = require("../models/room.model");

const roomController = {
  getRooms: async (req, res) => {
    try {
      const rooms = await Room.find();
      res.json({ status: "success", results: rooms.length, rooms: rooms });
    } catch (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = userController;
