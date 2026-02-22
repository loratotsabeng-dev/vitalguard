const { findNearbyPlaces } = require("../services/mapsService");

exports.getNearby = async (req, res) => {
  try {
    const { lat, lng, type } = req.query;

    if (!lat || !lng || !type) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    const results = await findNearbyPlaces(lat, lng, type);

    res.json(results);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};