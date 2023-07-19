const Holiday = require("../models/Holiday");
exports.addholiday = (req, res) => {
  const { hrId, reason, description, date } = req.body;
  const holiday = new Holiday({ hrId, reason, description, date });
  holiday
    .save()
    .then(() => {
      res.status(200).json({ error: "Holiday Added Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed To Add Holiday" });
    });
};

exports.returnAllHolidays = (req, res) => {
  const { hrId } = req.body;
  Holiday.find({ hrId })
    .then((holiday) => {
      const serializedData = holiday.map((item) => ({
        id: item._id,
        reason: item.reason,
        description: item.description,
        date: item.date.toISOString().slice(0, 10),
      }));
      res.status(200).json(serializedData);
    })
    .catch((error) => {
      console.error("Error fetching Holidays:", error);
      res.status(500).json({ message: "Server error" });
    });
};
