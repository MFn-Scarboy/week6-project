const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    // age: Number,
    // number: Number,
    // weight: Number,
    // height: Number,
    activity: [{day: Number, food: {name: String, calories: Number}, units: Number}],
    plan: {type: mongoose.Schema.Types.ObjectId, ref: "plan"},
    image_url: String,
})

const User = mongoose.model("User", UserSchema);

module.exports = User;