const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
console.log("Helloo Employee");
// router.use(express.json());
router.post("/addemployee", employeeController.addemployee);
// router.post('/login',hrController.login);
module.exports = router;
