const Notification = require("../models/Notification");
exports.addNotification = (req, res) => {
  const { hrId, date, message } = req.body;
  const notification = new Notification({
    hrId,
    date,
    message,
  });
  notification
    .save()
    .then(() => {
      res.status(200).json({ error: "Notification Added Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed To Create Notification" });
    });
};

exports.getNotificationsByDate = (req, res) => {
  const { hrId, date } = req.body;
  // console.log(hrId, date);
  Notification.find({ hrId })
    .then((notifications) => {
      const serializedData = notifications.map((item) => ({
        id: item._id,
        date: item.date,
        message: item.message,
      }));
      const finalData = serializedData.filter(function (el) {
        return el.date.toISOString().slice(0, 10) === date.slice(0, 10);
      });
      res.status(200).json(finalData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed To Fetch Notifications" });
    });
};
