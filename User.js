const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    fullname: String,
    gender: String,
    email: String,
    phone: String,
    age: Number,
    location:  {
    type:  {
    type:  String,
    default: "Point"

    },
    coordinates: [Number]

    },

    medicalRecords: String

});

module.exports = mongoose.model("User", UserSchema);