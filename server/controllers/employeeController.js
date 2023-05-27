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

exports.getemployeedata = (req, res) => {
  const hrId = req.params;
  console.log(hrId);
  Employee.find(hrId)
    .then((data) => {
      const serealizedData = data.map((emp) => ({
        id: emp._id,
        name: emp.name,
        email: emp.email,
        phonenumber: emp.phonenumber.toString(),
        department: emp.department,
        designation: emp.designation,
        joiningdate: emp.joiningdate,
        employmentstatus: emp.employmentstatus,
        probationenddate: emp.probationenddate,
        confirmationdate: emp.confirmationdate,
        salary: emp.salary,
        managername: emp.managername,
        leavebalance: emp.leavebalance,
      }));
      res.status(200).json(serealizedData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Server error" });
    });
};

exports.deleteEmployee = (req, res) => {
  const { empId } = req.params;
  Employee.findByIdAndDelete(empId)
    .then((deletedEmployee) => {
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee Not Found" });
      }
      res.status(200).json({ message: "Employee Deleted Successfully" });
    })
    .catch((error) => {
      console.log("Error Deleating Employee", error);
      res.status(500).json({ error: "Server Error" });
    });
};
