const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    // leavebalance,
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
    // leavebalance,
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
  // console.log(hrId);
  Employee.find(hrId)
    .then((data) => {
      const serealizedData = data.map((emp) => ({
        id: emp._id,
        name: emp.name,
        email: emp.email,
        temppassword: emp.temppassword,
        phonenumber: emp.phonenumber.toString(),
        aadharnumber: emp.aadharnumber.toString(),
        pannumber: emp.pannumber,
        address: emp.address,
        dateofbirth: emp.dateofbirth,
        gender: emp.gender,
        maritalstatus: emp.maritalstatus,
        emergencycontactname: emp.emergencycontactname,
        emergencycontactnumber: emp.emergencycontactnumber.toString(),
        accountnumber: emp.accountnumber.toString(),
        ifsccode: emp.ifsccode,
        department: emp.department,
        designation: emp.designation,
        joiningdate: emp.joiningdate,
        employmentstatus: emp.employmentstatus,
        probationenddate: emp.probationenddate,
        confirmationdate: emp.confirmationdate,
        salary: emp.salary,
        managername: emp.managername,
        // leavebalance: emp.leavebalance,
      }));
      res.status(200).json(serealizedData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Server error" });
    });
};

exports.getoneemployeedata = (req, res) => {
  const { empId } = req.params;
  Employee.findById(empId)
    .then((emp) => {
      const empData = {
        id: emp._id,
        name: emp.name,
        email: emp.email,
        phonenumber: emp.phonenumber.toString(),
        aadharnumber: emp.aadharnumber.toString(),
        pannumber: emp.pannumber,
        address: emp.address,
        dateofbirth: emp.dateofbirth,
        gender: emp.gender,
        maritalstatus: emp.maritalstatus,
        emergencycontactname: emp.emergencycontactname,
        emergencycontactnumber: emp.emergencycontactnumber.toString(),
        accountnumber: emp.accountnumber.toString(),
        ifsccode: emp.ifsccode,
        department: emp.department,
        designation: emp.designation,
        joiningdate: emp.joiningdate.toISOString().slice(0, 10),
        employmentstatus: emp.employmentstatus,
        probationenddate: emp.probationenddate.toISOString().slice(0, 10),
        confirmationdate: emp.confirmationdate.toISOString().slice(0, 10),
        salary: emp.salary,
        managername: emp.managername,
        casualleaves: emp.casualleaves,
        earnedleaves: emp.earnedleaves,
        maternityleaves: emp.maternityleaves,
      };
      res.status(200).json(empData);
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

exports.updateEmployeeById = (req, res) => {
  const empId = req.params.empId;
  const {
    name,
    email,
    temppassword,
    phonenumber,
    department,
    designation,
    joiningdate,
    employmentstatus,
    probationenddate,
    confirmationdate,
    salary,
    managername,
  } = req.body;
  Employee.findByIdAndUpdate(
    empId,
    {
      name,
      email,
      temppassword,
      phonenumber,
      department,
      designation,
      joiningdate,
      employmentstatus,
      probationenddate,
      confirmationdate,
      salary,
      managername,
    },
    { new: true }
  )
    .then((updatedEmployee) => {
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee Not Found" });
      }
      res.status(200).json({ message: "Employee Updated Successfully" });
    })
    .catch((error) => {
      console.error("Error Updating Employee Details:", error);
      res.status(500).json({ message: "Server Error" });
    });
};
exports.updateoneEmployeeById = (req, res) => {
  const empId = req.params.empId;
  const {
    name,
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
  } = req.body;
  Employee.findByIdAndUpdate(
    empId,
    {
      name,
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
    },
    { new: true }
  )
    .then((updatedEmployee) => {
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee Not Found" });
      }
      res.status(200).json({ message: "Employee Updated Successfully" });
    })
    .catch((error) => {
      console.error("Error Updating Employee Details:", error);
      res.status(500).json({ message: "Server Error" });
    });
};

exports.signinemp = (req, res) => {
  const { email, password } = req.body;

  Employee.findOne({ email: email })
    .then((emp) => {
      if (!emp) {
        res.status(401).json({ error: "Invalid Username" });
      } else {
        if (emp.ispassupdated == false) {
          console.log("I am In");
          if (password === emp.temppassword) {
            const id = emp._id;
            const empemail = emp.email;
            const hrid = emp.hrId;
            const name = emp.name;
            const phonenumber = emp.phonenumber.toString();
            const department = emp.department;
            const designation = emp.designation;
            const ispupdated = emp.ispassupdated;
            const token = jwt.sign(
              { empId: id, empEmail: empemail },
              "secret-key-top-secret",
              { expiresIn: "1h" }
            );
            res.status(200).json({
              token,
              id,
              empemail,
              ispupdated,
              hrid,
              name,
              phonenumber,
              department,
              designation,
            });
          } else {
            res.status(401).json({ error: "Invalid Password" });
          }
        } else {
          bcrypt.compare(password, emp.temppassword, (err, result) => {
            if (err) {
              res.status(500).json({ error: "An Error Occured" });
            } else if (!result) {
              res.status(401).json({ error: "Invalid Password" });
            } else {
              const id = emp._id;
              const empemail = emp.email;
              const hrid = emp.hrId;
              const name = emp.name;
              const phonenumber = emp.phonenumber.toString();
              const department = emp.department;
              const designation = emp.designation;
              const ispupdated = emp.ispassupdated;
              const token = jwt.sign(
                { empId: id, empEmail: empemail },
                "secret-key-top-secret",
                { expiresIn: "1h" }
              );
              res.status(200).json({
                token,
                id,
                empemail,
                ispupdated,
                hrid,
                name,
                phonenumber,
                department,
                designation,
              });
            }
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "An Error Occured" });
    });
};

exports.updatepasswordbyId = (req, res) => {
  const { id, pass } = req.body;
  bcrypt.hash(pass, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: "Failed to create Hash Password" });
    } else {
      Employee.findByIdAndUpdate(
        id,
        { temppassword: hashedPassword, ispassupdated: true },
        { new: true }
      )
        .then((updatedEmployee) => {
          if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee Not Found" });
          }
          res
            .status(200)
            .json({ message: "Employee Password Updated Successfully" });
        })
        .catch((error) => {
          console.error("Error Updating Employee Details:", error);
          res.status(500).json({ message: "Server Error" });
        });
    }
  });
};

exports.getIdFromEmail = (req, res) => {
  const { email } = req.body;
  Employee.findOne({ email: email }).then((emp) => {
    if (!emp) {
      res.status(401).json({ error: "Invalid Username" });
    } else {
      res.status(200).json({ id: emp._id });
    }
  });
};

exports.checkforpassupdated = (req, res) => {
  const { id } = req.body;
  Employee.findById(id).then((emp) => {
    if (!emp) {
      res.status(401).json({ error: "Employee Id Not Found" });
    } else {
      res.status(200).json({ ispassupdated: emp.ispassupdated });
    }
  });
};

exports.allEmployeesObject = (req, res) => {
  const hrId = req.params;
  Employee.find(hrId)
    .then((data) => {
      const serealizedData = data.map((emp) => ({
        key: emp._id,
        value: emp.name + "   " + emp.designation + "   " + emp.department,
        values: {
          details: emp.name + "   " + emp.designation + "   " + emp.department,
          email: emp.email,
          status: null,
        },
        // department: emp.department,
        // designation: emp.designation,
      }));
      res.status(200).json(serealizedData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Server error" });
    });
};
