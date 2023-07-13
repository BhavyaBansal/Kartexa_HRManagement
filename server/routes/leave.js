const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");
console.log("Hello Leave");
router.post("/insertleave", leaveController.insertLeave);
router.post("/getmonthleaves", leaveController.getcurrentmonthleaves);
router.post("/getmonthleaves2", leaveController.getcurrentmonthleaves2);
router.post("/updatestatusbyid", leaveController.updateStatusById);
module.exports = router;
