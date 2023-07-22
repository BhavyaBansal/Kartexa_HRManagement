const Timesheet = require("../models/Timesheet");

exports.addTimesheetinDB = (req, res) => {
  const {
    empId,
    hrId,
    name,
    email,
    phonenumber,
    employmenttype,
    duration,
    taskdone,
    image,
    date,
  } = req.body;
  const timesheet = new Timesheet({
    empId,
    hrId,
    name,
    email,
    phonenumber,
    employmenttype,
    duration,
    taskdone,
    image,
    date,
  });
  timesheet
    .save()
    .then(() => {
      res.status(200).json({ error: "TimeSheet Added Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed To Create Timesheet" });
    });
};

exports.getAllTimesheetsByDate = (req, res) => {
  const { hrId, date } = req.body;
  Timesheet.find({ hrId })
    .then((timesheet) => {
      const serializedData = timesheet.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        phonenumber: item.phonenumber,
        employmenttype: item.employmenttype,
        duration: item.duration,
        taskdone: item.taskdone,
        image: item.image,
        date: item.date.toISOString(),
      }));
      const finaldata = serializedData.filter(function (el) {
        return el.date.slice(0,10) === date.slice(0, 10);
      });
      res.status(200).json(finaldata);
    })
    .catch((error) => {
      console.error("Error fetching Timesheets:", error);
      res.status(500).json({ message: "Server error" });
    });
};
