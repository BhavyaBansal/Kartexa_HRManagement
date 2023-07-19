const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const holidaySchema = new Schema(
  {
    hrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hr",
      required: true,
      unique: false,
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Holiday", holidaySchema);
