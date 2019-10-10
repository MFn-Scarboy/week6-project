const express    = require("express")
const router     = express.Router()
const bcrypt     = require("bcrypt")
const bcryptSalt = 10
const User = require("../../models/user");
const Plan = require("../../models/plan");
const mongoose = require("mongoose");
const multer  = require('multer');
const upload = multer({ dest: `${__dirname}/../../public/uploads/` });

router.get("/signup", (req, res, next) => {
    Plan.find({})
        .then((plans)=>{
            res.render('signup', {plans})
        })
})

router.post("/signup", upload.single("image_url"), (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    const salt     = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    if(email === "" || password === "") {
        res.render("signup", {
            errorMessage: "Indicate a valid email and a password to sign up"
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
                height: req.body.height,
                age: req.body.age,
                weight: req.body.weight,
                number: req.body.number,
                plan: mongoose.Types.ObjectId(req.body.planId),
                image_url: req.file.filename
            })
            .then((user) => {
                req.session.user = user
                res.redirect("/auth/profile")
            })
        })
    .catch(error => {
        console.log(error)
    })
})

module.exports = router;