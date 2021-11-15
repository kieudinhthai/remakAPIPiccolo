const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../../models/products');
const Category = require('../../models/categories');
const Blog = require('../../models/blogs');

const CheckAuth = require('../../middleware/check_auth')
const trashAdminConstrollers =require('../../constrollers/admin/trash')

/* GET  err. */
router.get("/:slug",CheckAuth,trashAdminConstrollers.get_err)
// GET admin/trash
router.get('/',CheckAuth,trashAdminConstrollers.get_trash)
// DELETE admin/trash/product
router.delete("/product",CheckAuth,trashAdminConstrollers.destroy_product) 
// DELETE admin/trash/category
router.delete("/category", CheckAuth,trashAdminConstrollers.destroy_category)
// DELETE admin/trash/blog
router.delete("/blog",CheckAuth,trashAdminConstrollers.destroy_blog)
// RESTORE admin/trash/product
router.patch("/product/:id",CheckAuth,trashAdminConstrollers.restore_product )
// RESTORE admin/trash/category
router.patch("/category/:id",CheckAuth,trashAdminConstrollers.restore_category )
// RESTORE admin/trash/blog
router.patch("/blog/:id",CheckAuth,trashAdminConstrollers.restore_blog )

module.exports = router