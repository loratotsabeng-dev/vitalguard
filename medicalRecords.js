const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
const { conditions, missedMeds} = req.body
   
let risk = "low";

if (

    conditions.includes("Diabetes") && missedMeds > 1

)
risk = "High";

res.json({
    risk
});
});

module.exports = router;