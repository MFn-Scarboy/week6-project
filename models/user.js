const mongoose = require("mongoose")

const User = mongoose.model("user", {
    fullname: String,
    email: String,
    password: String,
    age: Number,
    number: Number,
    weight: Number,
    height: Number,
    age: Number,
    goal: "", //{type: ObjectId, ref: "goals"},
    image_url: String,
})

module.exports = User