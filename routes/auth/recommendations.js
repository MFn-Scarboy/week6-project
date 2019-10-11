const express    = require("express")
const router     = express.Router()

router.get("/recommendations", (req,res,next) => {
    res.render("recommendations");
});

module.exports = router;