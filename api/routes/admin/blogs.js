const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Blog = require('../../models/blogs')
const upload = require('../../middleware/upload')

/**
 * GET /admin/blogs
 */
router.get('/', (req, res, next) => {
    Blog.find({ deleted: false })
        .exec()
        .then(docs => {
            var i=1;
            res.status(200).render('admin_views/blogs', {
                data: docs.map(doc => {
                    return {
                        _id: doc._id,
                        stt: i++,
                        blogger_name: doc.blogger_name,
                        content: doc.content,
                        images: doc.images.toString()
                    }
                })
            })
        })
        .catch(err => { res.status(404).json({ err: err }) })
})
/**
 *  POST admin/blogs
 */
router.post('/', upload.array('images', 10), (req, res, next) => {
    console.log(req.files)
    let images = []
    req.files.forEach(image => {
        images.push(image.filename)
    })
    console.log(images);
    const newBlog = new Blog({
        _id: mongoose.Types.ObjectId(),
        blogger_name: req.body.blogger_name,
        content: req.body.content,
        images: images
    })
    newBlog.save()
        .then(() => res.status(200).render("success", {
            message: "Created new blog",
            back_link: "/admin/blogs"
        }))
        .catch(err => { res.status(500).json({ err: err }) })
})

/**
 *PATCH /admin/blogs/
 */

router.patch('/', upload.array('images', 10), (req, res, next) => {
    Blog.findOne({ _id: req.body._id })
        .then((blog) => {
            var images =[]
            if (req.files.length>0) {
                req.files.forEach(image => {
                    images.push(image.filename)
                })
            }
            else{
                images = blog.images
                console.log(images)
            }     
            const newBlog = new Blog({
                blogger_name: req.body.blogger_name,
                content: req.body.content,
                images: images
            })
           

            Blog.updateOne({_id:req.body._id},newBlog)
            .then(result => {
                res.status(200).render('success', {
                    message: "updated this blog",
                    back_link: "/admin/blogs"
                })
            
            })
            .catch(err => { res.status(500).json({ err: err }) })
        })
        .catch(err => { res.status(500).json({ err: err }) })
    })


/**
 * DELETE /admin/blogs/
 */
router.delete('/', (req, res, next) => {
    Blog.delete({ _id: req.body.id_delete })
        .then(result => {
            res.status(200).render('success', {
                message: "deleted this blog",
                back_link: "/admin/blogs"
            })
        })
        .catch(err => { res.status(500).json({ err: err }) })
})
module.exports = router