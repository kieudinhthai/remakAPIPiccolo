const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    console.log(req.cookies.cookieLogin);
    
    const token = req.cookies.cookieLogin
    if (!token) {
        res.status(401).render('unsuccess',{ message: "Please login!", back_link:"http://localhost:3000/admin/account/" })
    }
    else {
        jwt.verify(token, process.env.JWT_KEY, (err, data) => {
            if (err) {
                res.status(403).json({ message: err })
            }
            next()
        })
    }
}
