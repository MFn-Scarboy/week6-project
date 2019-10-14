const express    = require("express")
const router     = express.Router()
const User = require("../../models/user")

router.get("/recommendations", (req, res, next) => {
    var caloriesSum = 0;
     User.findById(req.session.user._id)
     .populate("plan")
     .then(user =>{
        for(i = 0; i < user.activity.length; i++){
             caloriesSum += user.activity[i].units*user.activity[i].food.calories/100/10;
        }
        debugger   
        res.render("recommendations", {caloriesSum, user})
     })
     .catch(err => console.log(err))
})

module.exports = router