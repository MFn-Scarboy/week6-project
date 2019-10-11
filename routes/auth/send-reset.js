const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const transporter = require("../../mailer/mailer");
var createError = require('http-errors');
var jwt = require('jsonwebtoken');

router.get("/send-reset", (req,res)=> {
    res.render("sendReset")
})

router.post("/send-reset", (req,res)=> {
    jwt.sign({email: req.body.email}, process.env.jwtSecret, { expiresIn: 60 * 60 }, function(err, token){
        if(err) next(createError(500))        
        else {
                transporter.sendMail({
                from: `"Fitnessapp user message" <foo@example.com>`, // sender address
                to: req.body.email, // list of receivers
                subject: 'Reset your password ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: `<b>Password reset: <a href="http://localhost:3000/auth/reset-password?token=${token}">Reset your password</a></b>` // html body
            })
            .then((result)=> {
                res.send("Check Your Email")
            })
            .catch((err)=> {
                res.next(createError(400))
            })
    }
    })
})

module.exports = router;