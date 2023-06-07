const express = require("express");
const router = express.Router();
const clockinoutController = require("../controllers/clockinoutController");
console.log("Helloo clockinout");
router.post("/clockin", clockinoutController.clockin);
router.put("/clockout", clockinoutController.clockout);
router.get("/clockindetails/:cId", clockinoutController.clockindetails);
router.get("/clockoutdetails/:cId", clockinoutController.clockoutdetails);
module.exports = router;
