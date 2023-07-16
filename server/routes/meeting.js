const express = require("express");
const router = express.Router();
const meetingsController = require("../controllers/meetingsController");
console.log("Hello Meet");
router.post("/schedulemeet", meetingsController.scheduleMeet);
router.post("/getmeetbyid", meetingsController.getMeetingsFromDate);
router.post("/changemeetstatus", meetingsController.changeMeetStatus);
router.post("/getallmeetinformat", meetingsController.getAllMeetInFormat);
module.exports = router;
