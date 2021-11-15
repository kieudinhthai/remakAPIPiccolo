var express = require('express');
var router = express.Router();

const customerConstrollers = require("../../constrollers/customers/home") 
/* GET  err. */
router.get("/:slug",customerConstrollers.get_err)
/* GET home page. */
router.get('/',customerConstrollers.get_index_customer)




module.exports = router;
