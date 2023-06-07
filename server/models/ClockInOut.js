const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clockinoutSchema = new Schema(
  {
    hrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hr",
      required: true,
      unique: false,
    },
    empId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: false,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: BigInt, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    leavebalance: { type: Number, required: true },
    clockintime: { type: Date },
    clockouttime: { type: Date, default: null },
    totaltimeworked: { type: String, default: "" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ClockInOut", clockinoutSchema);
