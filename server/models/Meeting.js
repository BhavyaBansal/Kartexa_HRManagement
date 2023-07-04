const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema(
  {
    hrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hr",
      required: true,
      unique: false,
    },
    topic: { type: String, required: true },
    description: { type: String, required: true },
    goals: { type: String, required: true },
    teamname: { type: String, required: true },
    teamsize: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true }, // To be inputed in minutes
    link: { type: String, required: true },
    participants: { type: Array, required: true },
    presentees: { type: Array },
    absentees: { type: Array },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Meeting", meetingSchema);
