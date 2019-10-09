const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const nodemailer = require("nodemailer")
require("dotenv").config()

router.get("/contact", (req, res, next) => {
    res.render("contact")
})

router.post("/contact", (req, res, next) => {
    if(req.body.name && req.body.email !== "") {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: `${process.env.user}`,
                pass: `${process.env.password}`
            }
        })
        let message = transporter.sendMail({
            from: `"Fitnessapp user message" <foo@example.com>`,
            to: "jrv3rkaik@gmail.com, neha95218@gmail.com",
            subject: `Message from: ${req.body.name} <${req.body.email}>`,
            text: `${req.body.message}`
        })
        .then(() => {console.log('Email sent'); res.redirect('/contact')} )
        .catch(err => console.log(err))
    }
})

module.exports = router;