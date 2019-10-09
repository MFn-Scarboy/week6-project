const express    = require("express")
const router     = express.Router()
const Food = require("../../models/food")
const User = require("../../models/user")

router.get("/activity", (req,res,next)=>{    
    Food.find({})
    .then((foods)=>{
        User.findById(req.session.user._id)
            .then((user)=>{
                if(user.activity.length > 0){
                    res.render("activity", {user, foods})
                } else {
                    res.render("activity", {foods})
                }
    })
    })
})

router.post("/activity", (req,res,next)=>{
    var userInput = {
        day: req.body["day-one"],
        food: JSON.parse(req.body["foodId-one"]),
        units: req.body["qty-one"]
    }
    User.findByIdAndUpdate(req.session.user._id, {$push: {activity: userInput}}, {new: true})
        .then((user)=>{
            res.redirect("/auth/activity");
        })

})

module.exports = router;