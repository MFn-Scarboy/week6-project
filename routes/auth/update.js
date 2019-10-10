const express    = require("express")
const router     = express.Router()
const bcrypt     = require("bcrypt")
const session = require("express-session");
const bcryptSalt = 10
const User = require("../../models/user");
const multer  = require('multer');
const upload = multer({ dest: `${__dirname}/../../public/uploads/` });

router.get("/update/:id", (req, res, next) => {
    let loggedInUser = req.session.user;
    res.render("update", {loggedInUser});
})

router.post("/update/:id", upload.single("image_url"), (req, res, next) => {
    const password = req.body.password
    const salt     = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    let updatedUserProfile = {};

    if(!password){
        updatedUserProfile = {
            fullname: req.body.fullname,
            email: req.body.email,
            height: req.body.height,
            age: req.body.age,
            weight: req.body.weight,
            number: req.body.number,
            image_url: req.file.filename
        }
    } else {
        updatedUserProfile = {
            fullname: req.body.fullname,
            password: hashPass,
            email: req.body.email,
            height: req.body.height,
            age: req.body.age,
            weight: req.body.weight,
            number: req.body.number,
            image_url: req.file.filename
        }
    } 
    
    User.findByIdAndUpdate(req.params.id, {$set: updatedUserProfile})
        .then(()=>{
            res.redirect("/auth/login")
    })
        .catch((error)=>{
            console.log(`Oops, you  got an error, ${error}`)
  })
})

module.exports = router;