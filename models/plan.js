const mongoose = require("mongoose")

const Plan = mongoose.model("plan", {
    title: String,
    image_url: String,
    //tags: [],
    body: String,
    
})

module.exports = Plan