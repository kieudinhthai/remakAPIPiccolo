const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Account = require('../../models/accounts')

/**
 * POST /admin/account/login
 */
exports.post_login = (req, res) => {
    Account.find({
        username: req.body.username,
    })
        .then(user => {
            if (user.length > 1) {
                res.status(401).json({ mess: "Username not found" })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.status(401).render("admin_views/login", { mess: "Auth is not found" })
                }
                if (result) {
                    const tokenLogin = jwt.sign({
                        userId: user._id,
                        username: user[0].username,
                    }, process.env.JWT_KEY, {
                        expiresIn: '1h'
                    })
                    res.cookie('cookieLogin', tokenLogin, { maxAge: 30 * 60 * 60, httpOnly: true })
                    res.render("success", {
                        message: "login successful",
                        back_link: "http://localhost:3000/admin"
                    })

                }
                res.render("admin_views/login")

            })
        })
        .catch((err) => res.json({ err: err }))
}

/**
 * POST /admin/account/change-pasword
 */
exports.change_password = (req, res, next) => {
    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                err: err
            })
        }
        if (hash) {
            Account.updateOne({ _id: req.body.id }, {
                username: req.body.newName,
                password: hash
            })
                .then((result) =>
                    res.status(200).json({ mess: "change password success" }))
                .catch(err => res.status(500).json({ err: err }))
        }

    })
}

/**
 * GET /account/login
 */
exports.get_admin = (req, res) => {
    res.render('admin_views/login')
}

/**
 * GET admin/account/logout
 */
 exports.get_logout= (req, res) => {
    res.clearCookie("cookieLogin");
    res.render('success',{message: 'Logout successfuly'})
    
 }

 /**
 *GET admin/account/:slug
 */

 exports.get_err =(req,res)=>{
    res.render('customer_views/error')
    }