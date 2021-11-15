const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../../models/products');
const Category = require('../../models/categories');
const Blog = require('../../models/blogs');
/**
 * GET admin/trash
 */
exports.get_trash = (req, res, next) => {
    Promise.all([Product.find({ deleted: true }), Category.find({ deleted: true }), Blog.find({ deleted: true })])
        .then(([docs1, docs2, docs3]) => {
            var i = 1; var j = 1; var k = 1
            res.status(200).render('admin_views/trash', {
                data: {
                    all_products: {
                        count: docs1.length,
                        products: docs1.map(doc => {

                            return {
                                _id: doc.id,
                                stt: i++,
                                name: doc.name,
                                vn_name: doc.vn_name,
                                category: doc.category,
                                price: doc.price,
                                image: doc.image,


                            }
                        })
                    },
                    all_categories: {
                        count: docs2.length,
                        categories: docs2.map(doc => {
                            return {
                                _id: doc.id,
                                stt: j++,
                                ct_name: doc.ct_name,
                                vn_ct_name: doc.vn_ct_name,



                            }
                        })
                    },
                    all_blogs: {
                        count: docs3.length,
                        blogs: docs3.map(doc => {
                            return {
                                stt: k++,
                                _id: doc._id,
                                blogger_name: doc.blogger_name,
                                content: doc.content.length > 50 ? doc.content.substring(0, 50) : doc.content,
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
 * DELETE admin/trash/product
 */
exports.destroy_product =(req, res, next) => {
    Product.deleteOne({ _id: req.body.id_delete_product })
        .then(() => {
            res.status(200).render('success', {
                message: "deleted this product",
                back_link: "/admin/trash/"
            })
        })
        .catch(err => { res.status(500).json({ err: err }) })
}

/**
 * DELETE admin/trash/category
 */
 exports.destroy_category = (req, res, next) => {
    Category.deleteOne({ _id: req.body.id_delete_category })
        .then(() => {
            res.status(200).render('success', {
                message: "deleted this category",
                back_link: "/admin/trash/"
            })
        })
        .catch(err => { res.status(500).json({ err: err }) })
}
/**
 * DELETE admin/trash/blog
 */
 exports.destroy_blog =(req, res, next) => {
    Blog.deleteOne({ _id: req.body.id_delete_blog })
        .then(() => {
            res.status(200).render('success', {
                message: "deleted this blog",
                back_link: "/admin/trash/"
            })
        })
        .catch(err => { res.status(500).json({ err: err }) })
}

/**
 * RESTORE admin/trash/product
 */
exports.restore_product= (req, res, next) => {
    Product.restore({ _id: req.params.id })
        .then(() => res.status(200).redirect('back'))
        .catch((err) => res.status(500).json({ err: err }));
}

/**
 * RESTORE admin/trash/category
 */
 exports.restore_category=(req, res, next) => {
    Category.restore({ _id: req.params.id })
        .then(() => res.status(200).redirect('back'))
        .catch((err) => res.status(500).json({ err: err }));
}
/**
 * RESTORE admin/trash/blog
 */
 exports.restore_blog=(req, res, next) => {
    Blog.restore({ _id: req.params.id })
        .then(() => res.status(200).redirect('back'))
        .catch((err) => res.status(500).json({ err: err }));
}

