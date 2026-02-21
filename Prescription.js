const mongoose = require("mongoose");
const PrescriptionSchema = new mongoose.Schema({

prescriptionId: String,
userID: String,
medicationName: String,
dosage: String,
frequency: String,
startDate: Date,
endDate: Date,
refillDate: Date,
reminderTimes: String,

});

module.exports = mongoose.model("Prescription", PrescriptionSchema);