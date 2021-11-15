const mongoose = require('mongoose');

const checkAuth = require('../../middleware/check_auth')
const Product = require('../../models/products');
const Category = require('../../models/categories');
const Blog = require('../../models/blogs');

/**
 * GET admin/ 
 */
exports.get_home_admin =(req, res, next) => {
    Promise.all([Product.find({deleted: false}).populate("category"), Category.find({deleted: false}), Blog.find({deleted: false})])
        .then(([docs1, docs2, docs3]) => {
            var i=1; var j=1; var k=1;
            res.status(200).render('admin_views/index', {
                data: {
                    all_products: {
                        count: docs1.length,
                        products: docs1.map(doc => {
                            return {
                                stt : i++,
                                _id: doc.id,
                                name: doc.name,
                                vn_name: doc.vn_name,
                                description:doc.description.length>80? doc.description.substring(0,80)+"...":doc.description,
                                category: doc.category ,
                                price: doc.price,
                                image: doc.image,
                                

                            }
                        })
                    },
                    all_categories: {
                        count: docs2.length,
                        categories: docs2.map(doc => {
                            return {
                                stt : j++,
                                _id: doc.id,
                                ct_name: doc.ct_name,
                                vn_ct_name: doc.vn_ct_name,

                                

                            }
                        })
                    },
                    all_blogs: {
                        count: docs3.length,
                        blogs: docs3.map(doc => {
                            return {
                                stt : k++,
                                blogger_name: doc.blogger_name,
                                content: doc.content.length>80 ? doc.content.substring(0,80)+"...":doc.content,
                            }
                        })
                    }
                }
            })
        })
        .catch((err) => {
            res.status(404).render('admin_views/index', {
                data: {
                    message: "can not find product"
                }
            })
        })
}
/**
 * GET admin/:slug
 */
exports.get_err = (req,res)=>{
    res.render('admin_views/error')
    }