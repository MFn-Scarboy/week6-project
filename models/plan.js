const mongoose = require("mongoose")

const Plan = mongoose.model("plan", {
    title: String,
    image_url: String,
    body: String,
    "OptionA": {
        "consumption": String,
        "consumption-comment": String,
        "subtitle1": String,
        "tip1": String,
        "tip2": String,
        "tip3": String,
        "subtitle2": String,
        "tip4": String,
        "tip5": String,
        "tip6": String,
    },
    "OptionB": {
        "consumption": String,
        "consumption-comment": String,
        "subtitle1": String,
        "tip1": String,
        "tip2": String,
        "tip3": String,
        "subtitle2": String,
        "tip4": String,
        "tip5": String,
        "tip6": String,
    },
    "OptionC": {
        "consumption": String,
        "consumption-comment": String,
        "subtitle1": String,
        "tip1": String,
        "tip2": String,
        "tip3": String,
        "subtitle2": String,
        "tip4": String,
        "tip5": String,
        "tip6": String,
    },
    "OptionD": {
        "consumption": String,
        "consumption-comment": String,
        "subtitle1": String,
        "tip1": String,
        "tip2": String,
        "tip3": String,
        "subtitle2": String,
        "tip4": String,
        "tip5": String,
        "tip6": String,
    },
})

module.exports = Plan