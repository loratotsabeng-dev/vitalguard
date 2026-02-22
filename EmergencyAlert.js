const mongoose = require("mongoose");
const { useImperativeHandle } = require("react");
const medicalRecordsSchema = new mongoose.Schema({
    alertID: String,
    user1D: String,
    timeStamp: Date,
    location: Geolocation,
    Status: String
})  

module.exports = mongoose.model("EmergencyAlert", EmergencyAlertSchema);

    