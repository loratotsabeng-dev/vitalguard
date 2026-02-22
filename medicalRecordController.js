const { db } = require("../config/firebase");
const { calculateRisk } = require("../services/riskService");

exports.createMedicalRecord = async (req, res) => {
  try {
    const riskLevel = calculateRisk(req.body);

    const recordRef = await db.collection("medicalRecords").add({
      ...req.body,
      riskLevel
    });

    res.json({ id: recordRef.id, riskLevel });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};