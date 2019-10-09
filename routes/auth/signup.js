const express    = require("express")
const router     = express.Router()
const bcrypt     = require("bcrypt")
const bcryptSalt = 10
const User       = require("../../models/user")


router.get("/signup", (req, res, next) => {
    res.render('signup')
})

router.post("/signup", (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const salt     = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    if(email === "" || password === "") {
        res.render("signup", {
            errorMessage: "Indicate a email and a password to sign up"
        })
        return
    }

    User.findOne({email})
    .then(user => {
        if(user !== null) {
            res.render("signup", {
                errorMessage: "The email already exists!"
              })
              return
            }
            User.create({
                fullname: req.body.fullname,
                password: hashPass,
                email,
                age: req.body.age,
                height: req.body.height,
                weight: req.body.weight,
                number: req.body.number,
                goal: req.body.goal,
                image_url: req.body.image_url
            })
            .then(() => {
                res.redirect("/auth/login")
            })
        })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router;