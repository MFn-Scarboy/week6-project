const express = require("express")
const router = express.Router()
const User = require("../../models/user")

//needs to be restricted
router.get("/profile", (req, res, next) => {
    res.render("auth/profile")
})

router.get("/delete", (req, res) => {
    User.findByIdAndDelete(req.query.id)
    .then((user) => {
        res.redirect("/index")
    })
    .catch((err) => {
        res.send(err)
    })
})

module.exports = router;