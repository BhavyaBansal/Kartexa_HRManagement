const express = require("express");
const router = express.Router();
const holidayController = require("../controllers/holidayController");
console.log("Hello Holiday");
router.post("/addholiday", holidayController.addholiday);
router.post("/getallholidays", holidayController.returnAllHolidays);
module.exports = router;
