const mongoose = require('mongoose');
const slug = require("mongoose-slug-generator");
const Account = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, require: true },
    password: { type: String, required: true },
}, { timestamps: true }
)
mongoose.plugin(slug);
module.exports = mongoose.model('account', Account)