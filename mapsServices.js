const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.findNearbyPlaces = async (lat, lng, type) => {
  try {
    const radius = 5000; // 5km

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

    const response = await axios.get(url, {
      params: {
        location: `${lat},${lng}`,
        radius,
        type,
        key: GOOGLE_API_KEY
      }
    });

    return response.data.results.map(place => ({
      name: place.name,
      address: place.vicinity,
      location: place.geometry.location,
      rating: place.rating || null
    }));

  } catch (error) {
    throw new Error("Error fetching nearby places");
  }
};