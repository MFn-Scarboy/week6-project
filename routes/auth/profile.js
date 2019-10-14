const express = require("express")
const router = express.Router()
const User = require("../../models/user")
const plan = require("../../models/plan")

router.get("/profile", (req, res, next) => {
   let loggedInUser = req.session.user
    plan.findById(loggedInUser.plan)
    .then((plan)=>{
        res.render("profile", {loggedInUser, plan});
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get("/delete", (req, res) => {
    User.findByIdAndDelete(req.query.id)
    .then((user) => {
        req.session.destroy()
        res.redirect("/")
    })
    .catch((err) => {
        res.send(err)
    })
})

module.exports = router;