const express = require('express');
const router = express.Router();

const upload = require('../../middleware/upload')
const CheckAuth = require('../../middleware/check_auth')
const blogAdminConstrollers =require('../../constrollers/admin/blogs')
// /* GET  err. */
// router.get("/:slug",CheckAuth,blogAdminConstrollers.get_err)
// GET /admin/blogs
router.get('/',CheckAuth,blogAdminConstrollers.get_blogs)
// POST admin/blogs
router.post('/', CheckAuth,upload.array('images', 10), blogAdminConstrollers.post_blog)
// PATCH /admin/blogs/
router.patch('/',CheckAuth, upload.array('images', 10),blogAdminConstrollers.update_blog)
// DELETE /admin/blogs/
router.delete('/',CheckAuth,blogAdminConstrollers.delete_blog )

module.exports = router