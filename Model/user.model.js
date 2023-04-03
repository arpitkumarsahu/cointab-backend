const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {type: String, required : true},
    password : {type: String, required : true},
    incorrect_password_count : {type : Number},
    time : {type : Number},
    minutes : {type : Number}
})

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel