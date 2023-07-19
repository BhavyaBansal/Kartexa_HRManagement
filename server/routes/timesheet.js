const express = require("express");
const router = express.Router();
const timesheetsController = require("../controllers/timesheetController");
console.log("Hello Timesheet");
router.post("/addtimesheetindb", timesheetsController.addTimesheetinDB);
router.post(
  "/getalltimesheetsbydate",
  timesheetsController.getAllTimesheetsByDate
);
module.exports = router;
