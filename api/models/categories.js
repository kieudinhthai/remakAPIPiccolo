const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require("mongoose-slug-generator");
const Category = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ct_name: String,
    vn_ct_name: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],

}, { timestamps: true })
//Add plugin
mongoose.plugin(slug);
Category.plugin(mongooseDelete,{
    deletedAt: true, 
    
  })
module.exports = mongoose.model('category', Category)