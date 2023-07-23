const Meeting = require("../models/Meeting");
exports.scheduleMeet = (req, res) => {
  const {
    hrId,
    topic,
    description,
    goals,
    teamname,
    teamsize,
    date,
    time,
    duration,
    link,
    participants,
  } = req.body;

  const meeting = new Meeting({
    hrId,
    topic,
    description,
    goals,
    teamname,
    teamsize,
    date,
    time,
    duration,
    link,
    participants,
  });
  meeting
    .save()
    .then(() => {
      res.status(200).json({ error: "Meeting Scheduled Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed To Schedule Meet" });
    });
};

exports.getMeetingsFromDate = (req, res) => {
  const { empId, date } = req.body;
  Meeting.find()
    .then((meet) => {
      const serializedData = meet.map((item) => ({
        meetId: item._id,
        topic: item.topic,
        date: item.date,
        time: item.time,
        duration: item.duration,
        link: item.link,
        participants: item.participants,
        teamname: item.teamname,
        teamsize: item.teamsize,
      }));
      const finalData = serializedData.filter(function (el) {
        function findEmp(participants) {
          for (let i = 0; i < participants.length; i++) {
            if (participants[i].id === empId) {
              return true;
            }
          }
          return false;
        }
        return (
          el.date.toISOString().slice(0, 10) === date &&
          findEmp(el.participants)
        );
      });
      res.status(200).json(finalData);
    })
    .catch((error) => {
      console.error("Error fetching Meetings:", error);
      res.status(500).json({ message: "Server error" });
    });
};

exports.changeMeetStatus = (req, res) => {
  const { meetId, empId, status } = req.body;
  Meeting.findById(meetId)
    .then((meeting) => {
      let parti = meeting.participants;
      for (let i = 0; i < parti.length; i++) {
        if (parti[i].id === empId) {
          parti[i].status = status;
          // res.status(200).json({ Success: "Status Updated Successfully" });
        }
      }
      Meeting.findByIdAndUpdate(meetId, { participants: parti }, { new: true })
        .then((updatedStatus) => {
          if (!updatedStatus) {
            return res
              .status(404)
              .json({ message: "Status of Meet Not Found" });
          }
          res.status(200).json({ message: "Status Updated Successfully" });
        })
        .catch((error) => {
          console.error("Error Updating Status:", error);
          res.status(500).json({ message: "Server Error" });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server error" });
    });
};

exports.getAllMeetInFormat = (req, res) => {
  const { hrId } = req.body;
  Meeting.find({ hrId })
    .then((meet) => {
      const serializedData = meet.map((data) => ({
        start: `${data.date.toISOString().slice(0, 10).toString()} ${
          data.time.split(" ")[0].length <= 1
            ? "0" + data.time.split(" ")[0]
            : data.time.split(" ")[0]
        }:${
          data.time.split(" ")[1].length <= 1
            ? "0" + data.time.split(" ")[1]
            : data.time.split(" ")[1]
        }:00`,
        duration: "0" + data.duration + ":00:00",
        note: data.topic,
        id: data._id,
      }));
      res.status(200).json(serializedData);
    })
    .catch((error) => {
      console.error("Error fetching Meetings:", error);
      res.status(500).json({ message: "Server error" });
    });
};

exports.getMeetingsByDate = (req, res) => {
  const { hrId, date } = req.body;
  Meeting.find({ hrId })
    .then((meet) => {
      const serializedData = meet.map((item) => ({
        id: item._id,
        topic: item.topic,
        description: item.description,
        goals: item.goals,
        teamname: item.teamname,
        teamsize: item.teamsize,
        date: item.date,
        time: item.time,
        duration: item.duration,
        link: item.link,
        participants: item.participants,
      }));
      const finalData = serializedData.filter(function (el) {
        return el.date.toISOString().slice(0, 10) === date.slice(0, 10);
      });
      res.status(200).json(finalData);
    })
    .catch((error) => {
      console.error("Error fetching Meetings:", error);
      res.status(500).json({ message: "Server error" });
    });
};
