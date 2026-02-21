const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const cron = require("node-cron");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES

app.use("/api/emergency", require ("./routes/emergency"));
app.use("/api/user", require ("./routes/user"));
app.use("/api/prescriptions", require ("./routes/prescriptions"));
app.use("/api/risk", require ("./routes/risk"));

// CRON JOB

const Prescription = require("./models/Prescription");
cron.schedule("0 9 * * *", async () => {
    console.log("Checking reminders...");
    const today = new Date();
    const data = await Prescription.find();
    console.log(data);
});

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(
    'Server running on port ${PORT}'

    )
);
