const express = require("express")
const router = express.Router()

//needs to be restricted
router.get("/profile", (req, res, next) => {
    res.render("auth/profile")
})

module.exports = router;