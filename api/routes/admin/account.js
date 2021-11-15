const express = require('express');
const router = express.Router()
const Account = require('../../models/accounts')
const CheckAuth = require('../../middleware/check_auth')

const accountConstrollers = require('../../constrollers/admin/account')
// /* GET  err. */
// router.get("/:slug",CheckAuth,accountConstrollers.get_err)
// POST /admin/account/login
router.post('/', accountConstrollers.post_login)
// POST /admin/change-pasword
router.post('/change-password',CheckAuth,accountConstrollers.change_password)
// GET admin/account/logout
router.get('/logout',CheckAuth,accountConstrollers.get_logout )
// GET /account/login
router.get('/',accountConstrollers.get_admin)

module.exports = router