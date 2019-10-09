const express    = require("express")
const router     = express.Router()
const bcrypt     = require("bcrypt")
const bcryptSalt = 10
const User       = require("../../models/user")
const session = require("express-session")

router.get("/login", (req, res, next) => {
    res.render("login")
})

router.post("/login", (req, res, next) => {
    const email = req.body.email
    const thePassword = req.body.password

    if(email === "" || thePassword === "") {
        res.render("login", {
            errorMessage: "Please enter both, email and password to sign up."
        })
        return
    }

    User.findOne({ "email": email })
    .then(user => {
        if(!user) {
            res.render("login", {
                errorMessage: "This email does not exist"
            })
            return
        }

        bcrypt.compare(thePassword, user.password, function(err, equal) {
            if(err) {
                res.render("login", {
                    errorMessage: "Incorrect password"
                })
            }
            if(equal) {
                req.session.user = user
                res.render("profile")
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