const Leave = require("../models/Leave");

exports.insertLeave = (req, res) => {
  const {
    hrId,
    empId,
    leaveReason,
    fromdate,
    todate,
    totalnoofdays,
    leavetype,
  } = req.body;
  const currentmonth = parseInt(fromdate.slice(6, 7));
  const leave = new Leave({
    hrId,
    empId,
    leaveReason,
    fromdate,
    todate,
    totalnoofdays,
    leavetype,
    currentmonth,
  });
  leave
    .save()
    .then(() => {
      res.status(200).json({ Success: "Leave Added Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed To Add Leave" });
    });
};

// For Type
exports.getcurrentmonthleaves = (req, res) => {
  const { empId, month, type } = req.body;
  Leave.find({ empId })
    .then((data) => {
      const serializedData = data.map((lev) => ({
        id: lev._id,
        reason: lev.leaveReason,
        from: lev.fromdate,
        to: lev.todate,
        days: lev.totalnoofdays,
        type: lev.leavetype,
        status: lev.leavestatus,
        month: lev.currentmonth,
      }));
      function filterType(type, ele) {
        if (type !== "All") {
          if (type === ele.type) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
      const finaldata = serializedData.filter(function (el) {
        return el.month === month && filterType(type, el);
      });
      res.status(200).json(finaldata);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Server error" });
    });
};

//For Status
exports.getcurrentmonthleaves2 = (req, res) => {
  const { hrId, month, status } = req.body;
  Leave.find({ hrId })
    .then((data) => {
      const serializedData = data.map((lev) => ({
        id: lev._id,
        empId: lev.empId,
        reason: lev.leaveReason,
        from: lev.fromdate,
        to: lev.todate,
        days: lev.totalnoofdays,
        type: lev.leavetype,
        status: lev.leavestatus,
        month: lev.currentmonth,
      }));
      function filterType(status, ele) {
        if (status === ele.status) {
          return true;
        } else {
          return false;
        }
      }
      const finaldata = serializedData.filter(function (el) {
        return el.month === month && filterType(status, el);
      });
      res.status(200).json(finaldata);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Server error" });
    });
};

exports.updateStatusById = (req, res) => {
  const { leaveId, status } = req.body;
  Leave.findByIdAndUpdate(leaveId, { leavestatus: status }, { new: true })
    .then((updatedStatus) => {
      if (!updatedStatus) {
        return res.status(404).json({ message: "Leave Details Not Found" });
      }
      res.status(200).json({ message: "Leave Status Updated Successfully" });
    })
    .catch((error) => {
      console.error("Error Updating Leave Status:", error);
      res.status(500).json({ message: "Server Error" });
    });
};
