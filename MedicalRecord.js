const mongoose = require("mongoose");
const medicalRecordsSchema = new mongoose.Schema({
    UserID: String,
    name: String,
    age: Number,
    gender: String,
    conditions: String,
    risk: String,
    visitDate: Date,
    appointmentStatus: String 
});

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);