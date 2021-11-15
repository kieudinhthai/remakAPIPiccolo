var express = require('express');
var router = express.Router();

const productConstrollers = require("../../constrollers/customers/products") 

// GET /search?q=
router.get('/search',productConstrollers.search_product)
// POST /products/:id
router.post("/comment/:id",productConstrollers.post_comment )
// GET /products/:_id
router.get('/:id',productConstrollers.get_detail_product )
// /* GET  err. */
// router.get("/:slug",productConstrollers.get_err)
//GET /products/
router.get('/',productConstrollers.get_all_product )

module.exports = router