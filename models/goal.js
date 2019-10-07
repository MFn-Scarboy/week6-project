const mongoose = require("mongoose")

const Goal = mongoose.model("goal", {
    title: String,
    image_url: String,
    //steps: [],
    body: String,
    
})