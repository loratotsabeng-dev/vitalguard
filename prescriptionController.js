const { db } = require("../config/firebase");

exports.addPrescription = async (req, res) => {
  try {
    const presRef = await db.collection("prescriptions").add(req.body);
    res.json({ id: presRef.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};