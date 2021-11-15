const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Category = require('../../models/categories')

/**
 * GET admin/categories
 */

 exports.get_categories =(req, res, next) => {
    Category.find({ deleted: false })
        .populate('products')
        .exec()
        .then((docs) => {
            var i = 1;
            res.status(200).render('admin_views/categories', {
                data: {
                    categories: docs.map((category => {

                        return {
                            _id: category._id,
                            ct_name: category.ct_name,
                            vn_ct_name: category.vn_ct_name,
                            stt: i++,
                            products: category.products.map(product => {
                                return {
                                    _id: product._id,
                                    name: product.name,
                                    vn_name: product.name,
                                    price: product.price,
                                    rate: product.rate,
                                    image: product.image,
                                    description: product.description,
                                    request: {
                                        method: "GET",
                                        url: "http://localhost:3000/product" + product._id,
                                    }

                                }
                            })
                        }

                    }))

                }
            })
        })
        .catch((error) => { res.status(404).json({ error: error }) })
}

/**
 * POST /admin/category
 */

exports.post_category =(req, res, next) => {

    const newCategory = new Category({
        _id: mongoose.Types.ObjectId(),
        ct_name: req.body.ct_name,
        vn_ct_name: req.body.vn_ct_name,
        products: []
    })
    Category.findOne({ $or: [{ ct_name: req.body.ct_name }, { vn_ct_name: req.body.vn_ct_name }] })
        .then(result => {
            if (result && result.deleted == true) {
                res.status(200).render('unsuccess',{ message: "This category is in the trash" })
            }
            if (result) {
                res.status(200).render('unsuccess',{
                    message: "This category is exist",
                    back_link: "http://localhost:3000/admin/categories"
                })
            }
            else {
                newCategory.save()
                    .then(() => {
                        res.status(200).render("success", {
                            message: "Added new category",
                            back_link: "http://localhost:3000/admin/categories"
                        })
                    })
                    .catch(err => { res.status(500).json({ err: err }) })
            }
        })
        .catch(err => { res.status(500).json({ err: err }) })

}

/**
 *PATCH /admin/categories/:id
 */
exports.update_category =(req, res, next) => {
    Category.updateOne({ _id: req.body._id }, {
        ct_name: req.body.ct_name,
        vn_ct_name: req.body.vn_ct_name
    })
        .then(result => {
            res.status(200).render('success', {
                message: "updated this category",
                back_link: "http://localhost/admin/categories"
            })
        })
        .catch(err => { res.status(500).json({ err: err }) })
}
/**
 * DELETE /admin/categories/
 */
exports.delete_category =(req, res, next) => {
    Category.delete({ _id: req.body.id_delete})
        .then(result => {
            res.status(200).render('success', {
                message: "deleted this category",
                back_link: "http://localhost:3000/admin/categories"
            })
        })
        .catch(err => { res.status(500).json({ err: err }) })
}

/**
 *GET admin/category/:slug
 */

 exports.get_err =(req,res)=>{
    res.render('customer_views/error')
    }