const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require("mongoose-slug-generator");
const Product = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    vn_name:String,
    description:String,
    price:Number,
    image:String,
    rate:Number,
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    
}, { timestamps: true })
//Add plugin
mongoose.plugin(slug);
Product.plugin(mongooseDelete,{
    deletedAt: true, 
    
    
  })
module.exports = mongoose.model('product', Product)
