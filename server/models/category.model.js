const mongoose  = require('mongoose');

const categorySchema = new mongoose.Schema({
    nameCategory: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Category", categorySchema);