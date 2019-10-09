const mongoose = require("mongoose")

const Food = mongoose.model("food", {
    food: String,
    calories: Number   
})

module.exports = Food