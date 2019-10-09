const express = require("express")
const router = express.Router()
const plan = require("../../models/plan")

//needs to be restricted
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

module.exports = router;