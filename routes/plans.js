const express = require("express")
const router = express.Router()
const Plan = require(".././models/plan");

router.get("/plans", (req, res, next) => {
    Plan.find({})
        .then((plans)=>{
            res.render("plans", {plans});
        })
})

module.exports = router;