const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const leaveSchema = new Schema(
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
    leaveReason: {
      type: String,
      required: true,
    },
    fromdate: {
      type: Date,
      required: true,
    },
    todate: {
      type: Date,
      required: true,
    },
    totalnoofdays: { type: Number, required: true },
    leavetype: {
      type: String,
      enum: ["Casual", "Sick", "Maternity", "Earned"],
      default: "Casual",
      required: true,
    },
    leavestatus: {
      type: String,
      enum: ["Awaiting", "Declined", "Approved"],
      default: "Awaiting",
      required: true,
    },
    currentmonth: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Leave", leaveSchema);
