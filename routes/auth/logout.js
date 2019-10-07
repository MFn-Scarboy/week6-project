const express    = require("express")
const router     = express.Router()

router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/index");
    })
})
  
module.exports = router;