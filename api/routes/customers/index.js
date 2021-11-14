var express = require('express');
var router = express.Router();

const Product = require('../../models/products')
/* GET home page. */
router.get('/', (req, res, next) => {
  Product.find()
    .select('name vn_name description price rate image cateogory')
    .populate("category", "ct_name")
    .exec()
    .then((docs) => {
      res.status(200).render('customer_views/index', {data:{
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc.id,
            name: doc.name,
            vn_name: doc.vn_name,
            category: doc.category,
            price:doc.price,
            image:doc.image,
            request: {
              method: 'GET',
              url: 'http://localhost:3000/products/' + doc._id
            }

          }
        })
      }})
    })
    .catch((err) => {
      res.status(404).render('customer_views/index', {data:{
        message: "can not find product"}
      })
    })

})
/* GET product err. */
router.get("/:slug",(req,res)=>{
res.render('customer_views/error')
})



module.exports = router;
