const mongoose = require("mongoose");


const schema = new mongoose.Schema({
    phone: {
        type: String,
        require: true,
    }
}, { timestamps: true })



const model = mongoose.model("BanUser", schema);

module.exports = model