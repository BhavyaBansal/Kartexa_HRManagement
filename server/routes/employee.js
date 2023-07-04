const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
console.log("Helloo Employee");
// router.use(express.json());
router.post("/addemployee", employeeController.addemployee);
router.get("/getemployeedata/:hrId", employeeController.getemployeedata);
router.delete("/deleteEmployee/:empId", employeeController.deleteEmployee);
router.put("/updateEmployeeById/:empId", employeeController.updateEmployeeById);
router.put(
  "/updateoneEmployeeById/:empId",
  employeeController.updateoneEmployeeById
);
router.post("/signinemp", employeeController.signinemp);
router.put("/updatepasswordbyId", employeeController.updatepasswordbyId);
router.post("/getidbyemail", employeeController.getIdFromEmail);
router.post("/checkforpassupdated", employeeController.checkforpassupdated);
router.get("/getoneemployeedata/:empId", employeeController.getoneemployeedata);
router.get("/getemployeesobject/:hrId", employeeController.allEmployeesObject);
// router.post('/login',hrController.login);
module.exports = router;
