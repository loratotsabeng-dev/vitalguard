const express = require("express");
const router = require.Router();
const Prescription = require("../models/Prescription");

// CREATE

router.post("/", async (req, res) => {
    const prescription = awaitPrescription. create(req.body);
    res.json(prescription);
});

// GET ALL

router.get("/", async (req, res) => {
    const data = await Prescription.find();

    res.json(data)
});