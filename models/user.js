const mongoose = require("mongoose")

const User = mongoose.model("user", {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    age: Number,
    phoneNumber: Number,
    weight: Number,
    height: Number,
    age: Number,
    goal: [],
    image_url: String,
})

module.exports = User