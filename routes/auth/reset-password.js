const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user");
var jwt = require('jsonwebtoken');

router.get("/reset-password", (req,res)=> {
    res.render("resetPassword", {token: req.query.token})
})

router.post("/reset-password", (req,res)=> {
    jwt.verify(req.body.token, process.env.jwtSecret, function(err, token){
        if(err) res.send(err)
        bcrypt.hash(req.body.password, 10, function(err, hash){
            if(err) res.send(err)
            else {
                User.findOneAndUpdate({email: token.email}, {password: hash})
                .then((result)=> {
                    res.redirect("/auth/login")
                })
                .catch((err)=> {
                    res.send(err)
                })
            }
        })
    })
})

module.exports = router;