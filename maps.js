const express = require("express");
const router = express.Router();
const { getNearby } = require("../controllers/mapsController");

router.get("/nearby", getNearby);

module.exports = router;