const mongoose = require('mongoose');

const Product = require('../../models/products')
const Category = require('../../models/categories')
const Comment = require('../../models/comments');

/**
 * GET /products/
 */
exports.get_all_product=(req, res, next) => {
    Promise.all([Product.find({}).populate('category'), Category.find({}).populate('products')])
        .then(([product, category]) => {
            res.status(200).render('customer_views/products', {
                data: {
                    all_products: {
                        title: 'All products',
                        count: product.length,
                        docs: product.map(product => {
                            return {
                                _id: product._id,
                                name: product.name,
                                vn_name: product.vn_name,
                                description: product.description,
                                price: product.price,
                                image: product.image,
                                rate: product.rate,
                                category: product.category,
                                request: {
                                    method: 'GET',
                                    url: 'http://localhost:3000/products/' + product._id
                                }
                            }
                        })
                    },
                    categories: category.map((category => {
                        return {
                            _id: category._id,
                            ct_name: category.ct_name,
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
                                        url: 'http://localhost:3000/products/' + product._id
                                    }

                                }
                            })
                        }

                    }))
                }
            })
        })

    
        .catch((err) => { res.status(404).json({ err: err }) })
}

/**
 * GET /products/?q=
 */
exports.search_product=(req, res, next) => {
    Promise.all([Product.find({ name: new RegExp(req.query.q, "i")}).populate('category'), Category.find({}).populate('products')])
        .then(([product, category]) => {
            res.status(200).render('customer_views/products', {
                data: {
                    all_products: {
                        title: 'All products',
                        count: product.length,
                        docs: product.map(product => {
                            return {
                                _id: product._id,
                                name: product.name,
                                vn_name: product.vn_name,
                                description: product.description,
                                price: product.price,
                                image: product.image,
                                rate: product.rate,
                                category: product.category,
                                request: {
                                    method: 'GET',
                                    url: 'http://localhost:3000/products/' + product._id
                                }
                            }
                        })
                    },
                    categories: category.map((category => {
                        return {
                            _id: category._id,
                            ct_name: category.ct_name,
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
                                        url: 'http://localhost:3000/products/' + product._id
                                    }

                                }
                            })
                        }

                    }))
                }
            })
        })

    
        .catch((err) => { res.status(404).json({ err: err }) })
}
/**
 * GET /products/:_id
 */
exports.get_detail_product =(req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .populate("category")
        .populate('comments')
        .then(product => {
            Product.find({ category: product.category })
                .then(products => {
                    res.status(200).render('customer_views/detail', {
                        data: {
                            product: product,
                            comments: product.comments.map((comment) => {
                                return {
                                    name: comment.name,
                                    comment: comment.comment
                                }
                            }),
                            same_products: products.map(product => {
                                return {
                                    _id: product._id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                    request: {
                                        method: 'GET',
                                        url: 'http://localhost:3000/products/' + product._id
                                    }
                                }
                            })
                        }
                    })
                })
                .catch((err) => { res.status(404).render('error')})
        })
        .catch((err) => { res.status(404).render('error')})
}

/**
 * POST /products/:id
 */
exports.post_comment =(req, res, next) => {
    var newComment = new Comment({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        comment: req.body.comment,
        rate: Number(req.body.rate),
        product: req.body.product
    })
    newComment.save()
        .then((result) => {
            Product.updateOne({ _id: result.product }, { $push: { comments: result._id } })
                .then((result) => {
                    res.status(200).render("success", {
                        message: "Thanks for your feedback!",
                        back_link: "http://localhost:3000/products"
                    })
                })
                .catch((error) => { res.status(500).json({ error: error }) })
        })
        .catch((err) => { res.status(500).json({ err: err }) })
}

