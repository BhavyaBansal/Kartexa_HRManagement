const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    hrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hr",
      required: true,
      unique: false,
    },
    date: { type: Date, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notification", notificationSchema);
