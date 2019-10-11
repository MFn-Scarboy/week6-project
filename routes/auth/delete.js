const express    = require("express")
const router     = express.Router()
const User = require("../../models/user");

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