const mongoose = require('mongoose');
const slug = require("mongoose-slug-generator");
const Comment = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    comment:String,
    email:String,
    rate: Number,
    product:{type: mongoose.Schema.Types.ObjectId}
}, { timestamps: true })

mongoose.plugin(slug);

module.exports = mongoose.model('comment', Comment)