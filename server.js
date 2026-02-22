require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./cron/reminderCron");

const userRoutes = require("./routes/users");
const prescriptionRoutes = require("./routes/prescriptions");
const emergencyRoutes = require("./routes/emergency");
const medicalRecordRoutes = require("./routes/medicalRecords");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/medical-records", medicalRecordRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mapsRoutes = require("./routes/maps");

app.use("/api/maps", mapsRoutes);