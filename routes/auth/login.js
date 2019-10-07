const express    = require("express")
const router     = express.Router()
const bcrypt     = require("bcrypt")
const bcryptSalt = 10
const User       = require("../models/user")

router.get("/login", (req, res, next) => {
    res.render("auth/login")
})

router.post("/login", (req, res, next) => {
    const theUsername = req.body.username
    const thePassword = req.body.password

    if(theUsername === "" || thePassword === "") {
        res.render("auth/login", {
            errorMessage: "Please enter both, username and password to sign up."
        })
        return
    }

    User.findOne({ "username": theUsername })
    .then(user => {
        if(!user) {
            res.render("auth/login", {
                errorMessage: "This username does not exist"
            })
            return
        }

        bcrypt.compare(thePassword, user.password, function(err, equal) {
            if(err) {
                res.render("auth/login", {
                    errorMessage: "Incorrect password"
                })
            }
            if(equal) {
                req.session.user = user
                res.redirect("/profile")
            } else {
                next({ message: "Incorrect password" })
            }
        })
    })
    .catch(err => {
        next(err)
    })
})

module.exports = router;