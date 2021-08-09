const mongoose  = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Rooms"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    message:{
        type: String,
        required: true,
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Messages", messageSchema);