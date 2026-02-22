const express = require("express");
const router = express.Router();
const EmergencyAlert = require("../models/EmergencyAlert");

// CREATE ALERT

router.post("/", async (req, res) => {

try{
const {userId, location } = req.body;

const alert = await EmergencyAlert.create({
    userId,
    location
});

res.json({
message:
"Ambulance alerted!",
alert

});
}   

catch (error) {
res.status(500).json({
error: error.message    
})
}
});

// GET ALL ALERTS

router.get("/", async (req, res) => {
    const data = await Prescription.find();
    res.json(data);
});

module.exports = router