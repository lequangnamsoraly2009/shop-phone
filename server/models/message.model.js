const mongoose  = require('mongoose');

const messageSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: Object,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Messages", messageSchema);