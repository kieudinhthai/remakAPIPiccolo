const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require("mongoose-slug-generator");

const Blog = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  blogger_name: String,
  content: String,
  images: Array,
}, { timestamps: true })
//Add plugin
mongoose.plugin(slug);
Blog.plugin(mongooseDelete, {
  deletedAt: true,

})
module.exports = mongoose.model('blog', Blog)