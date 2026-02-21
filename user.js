const express = require("express");
const router = express.Router();
const EmergencyAlert = require("../models/User");

// CREATE USER

router.post("/", async (req, res) => {
    const user = await UserActivation.create(req.body);
    res.json(user);
});

// GET USERS

router.get("/", async (req, res) => {
    const user = await UserActivation.find();
    res.json(users);
});

module.exports = router;