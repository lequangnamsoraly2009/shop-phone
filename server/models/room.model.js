const mongoose  = require('mongoose');

const roomSchema = new mongoose.Schema({
    nameRoom: {
        type: String,
        required: true,
        unique: true,
    },
    userId:{
        type: String,
        required: true,
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Rooms", roomSchema);