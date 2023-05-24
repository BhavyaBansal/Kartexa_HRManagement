const Employee = require("../models/Employee");
exports.addemployee = (req, res) => {
  const {
    hrId,
    name,
    email,
    temppassword,
    phonenumber,
    aadharnumber,
    pannumber,
    address,
    dateofbirth,
    gender,
    maritalstatus,
    emergencycontactname,
    emergencycontactnumber,
    accountnumber,
    ifsccode,
    department,
    designation,
    joiningdate,
    employmentstatus,
    probationenddate,
    confirmationdate,
    salary,
    managername,
    leavebalance,
  } = req.body;

  const employee = new Employee({
    hrId,
    name,
    email,
    temppassword,
    phonenumber,
    aadharnumber,
    pannumber,
    address,
    dateofbirth,
    gender,
    maritalstatus,
    emergencycontactname,
    emergencycontactnumber,
    accountnumber,
    ifsccode,
    department,
    designation,
    joiningdate,
    employmentstatus,
    probationenddate,
    confirmationdate,
    salary,
    managername,
    leavebalance,
  });
  employee
    .save()
    .then(() => {
      res.status(200).json({ error: "Employee Added Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed To Create Employee" });
    });
};
