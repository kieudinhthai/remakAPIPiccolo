const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Category = require('../../models/categories')
const CheckAuth = require('../../middleware/check_auth')

const adminCategoryConstrollers = require('../../constrollers/admin/categories')
// /* GET  err. */
// router.get("/:slug",CheckAuth,adminCategoryConstrollers.get_err)
// GET admin/categories
router.get('/',CheckAuth,adminCategoryConstrollers.get_categories )
// POST /admin/category
router.post('/',CheckAuth,adminCategoryConstrollers.post_category )
// PATCH /admin/categories/:id
router.patch('/',CheckAuth,adminCategoryConstrollers.update_category )
// DELETE /admin/categories/
router.delete('/',CheckAuth,adminCategoryConstrollers.delete_category )


module.exports = router