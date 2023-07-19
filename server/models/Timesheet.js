const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timesheetSchema = new Schema(
  {
    empId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: false,
    },
    hrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hr",
      required: true,
      unique: false,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    employmenttype: { type: String, required: true },
    duration: { type: Number, required: true },
    taskdone: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Timesheet", timesheetSchema);
