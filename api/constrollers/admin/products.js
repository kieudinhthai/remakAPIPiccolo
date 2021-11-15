const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../../models/products');
const Cateogory = require('../../models/categories');
const upload = require('../../middleware/upload')

/**
 * GET admin/products
 */

exports.get_products = (req, res, next) => {
    Promise.all([Product.find({ deleted: false }).populate('category'), Cateogory.find({ deleted: false })])

        .then(([docs, docs1]) => {
            var i = 1
            res.status(200).render("admin_views/products", {
                data: {
                    all_products: {
                        count: docs.length,
                        products: docs.map(doc => {
                            return {
                                _id: doc.id,
                                stt: i++,
                                name: doc.name,
                                vn_name: doc.vn_name,
                                category: doc.category,
                                price: doc.price,
                                description: doc.description,
                                image: doc.image,
                                request: {
                                    method: 'GET',
                                    url: 'http://localhost:3000/' + doc._id
                                }
                            }
                        })
                    },
                    all_categories: {
                        categories: docs1.map(doc => {
                            return {
                                _id: doc._id,
                                ct_name: doc.ct_name,
                            }
                        })
                    }
                }
            })
        })
}
/**
 * POST admin/products
 */

exports.post_product = (req, res, next) => {
    const newProduct = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        vn_name: req.body.vn_name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: req.file.filename,
        comment: []
    })


    newProduct.save()
        .then((result) => {
            res.status(200).json({ result: result })
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        })
}

/**
 * PATCH admin/products
 */

exports.update_product = (req, res, next) => {
    Product.findOne({ _id: req.body._id })
        .then((product) => {
            var image
            var comments = product.comments
            if (req.file) {
                image = req.file.filename
            }

            else {
                image = product.image
                console.log(image)
            }
            console.log(product.comments)
            // console.log(image)
            var newProduct = new Product({
                name: req.body.name,
                vn_name: req.body.vn_name,
                description: req.body.description,
                category: req.body.ct_name,
                price: req.body.price,
                image: image,
                comments: comments

            })

            console.log(newProduct)

            Product.updateOne({ _id: req.body._id }, { $set: newProduct })
                .then(result => {
                    res.status(200).render('success', {
                        message: "updated this product",
                        back_link: "/admin/products"
                    })

                })
                .catch(err => { res.status(500).json({ err: "error" }) })
        })
        .catch(err => { res.status(500).json({ err: err }) })
}

/**
* DELETE /admin/products/
*/

exports.delete_product = (req, res, next) => {
    Product.delete({ _id: req.body.id_delete })
        .then(result => {
            res.status(200).render('success', {
                message: "deleted this product",
                back_link: "/admin/products"
            })
        })
        .catch(err => { res.status(500).json({ err: err }) })
}

/**
 * GET admin/products/:slug
 */

 exports.get_err =(req,res)=>{
    res.render('customer_views/error')
    }