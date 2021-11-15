const express = require('express');
const router = express.Router();

const upload = require('../../middleware/upload')
const CheckAuth = require('../../middleware/check_auth')
const productsAdminConstrollers =require('../../constrollers/admin/products')
// /* GET  err. */
// router.get("/:slug",CheckAuth,productsAdminConstrollers.get_err)
// GET admin/products
router.get('/',CheckAuth,productsAdminConstrollers.get_products )
// POST admin/products
router.post('/',CheckAuth, upload.single("image"),productsAdminConstrollers.post_product)
// PATCH admin/products
router.patch('/', CheckAuth, upload.single("image"),productsAdminConstrollers.update_product)
// DELETE /admin/products/
router.delete('/',CheckAuth,productsAdminConstrollers.delete_product)  

module.exports = router