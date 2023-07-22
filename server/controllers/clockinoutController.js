// const ClockInOut = require("../models/ClockInOut");
const Cio = require("../models/ClockInOut");
const Employee = require("../models/Employee");
exports.clockin = (req, res) => {
  const { hrId, empId, name, email, phonenumber, department, designation } =
    req.body;
  let oldDate = new Date();
  let newDate = new Date();
  newDate.setTime(oldDate.getTime() + 19800 * 1000);
  const cio = new Cio({
    hrId,
    empId,
    name,
    email,
    phonenumber,
    department,
    designation,
    clockintime: newDate,
  });
  cio
    .save()
    .then(() => {
      const cid = cio._id.toString();
      res.status(200).json({ newDate, cid });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed To Clocked In" });
    });
};

exports.clockout = (req, res) => {
  const { cid, inTime } = req.body;
  let oldoutDate = new Date();
  let newoutDate = new Date();
  newoutDate.setTime(oldoutDate.getTime() + 19800 * 1000);
  let outDatenew = newoutDate.toISOString();
  let outTime = outDatenew.slice(11, 16);
  // console.log(outDatenew);
  let inTimeHours = parseInt(inTime.slice(0, 2));
  let inTimeMinutes = parseInt(inTime.slice(3, 5));
  let outTimeHours = parseInt(outTime.slice(0, 2));
  let outTimeMinutes = parseInt(outTime.slice(3, 5));
  const totalTimeOutMinutes =
    outTimeHours * 60 + outTimeMinutes - (inTimeHours * 60 + inTimeMinutes);
  const timeoutHours = parseInt(totalTimeOutMinutes / 60);
  const timeoutMinutes = totalTimeOutMinutes % 60;
  const totalTimeOut =
    timeoutHours.toString() + ":" + timeoutMinutes.toString();
  Cio.findByIdAndUpdate(
    cid,
    { clockouttime: newoutDate, totaltimeworked: totalTimeOut },
    { new: true }
  )
    .then((updatedItem) => {
      if (!updatedItem) {
        return res.status(404).json({ message: "Clock Details Not Found" });
      }
      res.status(200).json({ outTime, totalTimeOut });
    })
    .catch((error) => {
      console.error("Error Updating Clock Details:", error);
      res.status(500).json({ message: "Server Error" });
    });
};

exports.clockindetails = (req, res) => {
  const input = req.params;
  // const { hrId } = req.body;
  const date = input.cId.slice(0, 10);
  const hrId = input.cId.toString().slice(10);
  console.log(hrId, date);
  Cio.find()
    .then((cid) => {
      const serializedData = cid.map((item) => ({
        id: item._id,
        hrId: item.hrId,
        name: item.name,
        email: item.email,
        designation: item.designation,
        department: item.department,
        clockintime: item.clockintime.toISOString(),
      }));
      const finalData = serializedData.filter(function (el) {
        // console.log(el.clockintime.slice(0, 10));
        return (
          el.clockintime.slice(0, 10) === date && el.hrId.toString() === hrId
        );
      });
      res.status(200).json(finalData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Server error" });
    });
};

exports.clockoutdetails = (req, res) => {
  const input = req.params;
  // const { hrId } = req.body;
  const date = input.cId.slice(0, 10);
  const hrId = input.cId.toString().slice(10);
  Cio.find()
    .then((cid) => {
      const serializedData = cid.map((item) => ({
        id: item._id,
        hrId: item.hrId,
        name: item.name,
        email: item.email,
        designation: item.designation,
        department: item.department,
        clockouttime:
          item.clockouttime !== null
            ? item.clockouttime.toISOString()
            : item.clockouttime,
        totaltimeworked: item.totaltimeworked,
      }));
      const finalData = serializedData.filter(function (el) {
        // console.log(el.clockintime.slice(0, 10));
        return (
          el.clockouttime !== null &&
          el.clockouttime.slice(0, 10) === date &&
          el.hrId.toString() === hrId
        );
      });
      res.status(200).json(finalData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Server error" });
    });
};


// Assuming Cio and Employee are Mongoose models for MongoDB collections

function findFinalEmpDetails(id, weekArray) {
  return new Promise((resolve, reject) => {
    Cio.find({ empId: id }).then((clockinoutsObj) => {
      const serializedClockDetails = clockinoutsObj.map((cin) => ({
        clockintime: cin.clockintime,
        clockouttime: cin.clockouttime,
      }));
      const finalEmpDetails = {};
      const oneEmpDetails = {};
      let totalminutes = 0;
      for (let j = 0; j < serializedClockDetails.length; j++) {
        for (let k = 0; k < weekArray.length; k++) {
          if (
            serializedClockDetails[j].clockintime.toISOString().slice(0, 10) ===
            weekArray[k]
          ) {
            let inTime = serializedClockDetails[j].clockintime.getTime();
            let outTime = serializedClockDetails[j].clockouttime.getTime();
            let minutesWorked = (outTime - inTime) / 60000;
            totalminutes += parseInt(minutesWorked);
            oneEmpDetails[weekArray[k]] = minutesWorked;
          }
        }
      }
      oneEmpDetails["totalWeeklyMinutes"] = totalminutes;
      finalEmpDetails[id] = oneEmpDetails;
      resolve(finalEmpDetails);
    }).catch((err) => reject(err));
  });
}

exports.getWeeklyReportDetails = (req, res) => {
  const { hrId, weekArray } = req.body;
  Employee.find({ hrId }).then((empObj) => {
    const serializedEmpIds = empObj.map((employee) => ({
      id: employee._id,
    }));
    const employeeweeklytimes = [];
    for (let i = 0; i < serializedEmpIds.length; i++) {
      findFinalEmpDetails(serializedEmpIds[i].id, weekArray).then((empDetails) => {
        // console.log(empDetails);
        employeeweeklytimes.push(empDetails);
        if (employeeweeklytimes.length === serializedEmpIds.length) {
          // Once all employees' details are collected, send the response to the client
          res.json(employeeweeklytimes);
        }
      }).catch((err) => {
        // Handle any errors that occurred during processing
        console.error(err);
        res.status(500).json({ error: 'An error occurred while processing the data.' });
      });
    }
  });
};

