
const express = require('express');
const router = express.Router();
const CheckAuth = require('../../middleware/check_auth')
const homeAdminConstrollers = require('../../constrollers/admin/home')
// /* GET  err. */
// router.get("/:slug",CheckAuth,homeAdminConstrollers.get_err)
// GET admin
router.get('/',CheckAuth,homeAdminConstrollers.get_home_admin )

 
module.exports = router