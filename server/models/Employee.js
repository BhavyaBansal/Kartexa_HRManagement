const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema(
  {
    hrId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hr",
      required: true,
      unique: false,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    temppassword: { type: String, required: true },
    phonenumber: { type: BigInt, required: true, unique: true },
    aadharnumber: { type: BigInt, default: 0 },
    pannumber: { type: String, default: "" },
    address: { type: String, default: "" },
    dateofbirth: { type: Date, default: null },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      default: "male",
    },
    maritalstatus: {
      type: String,
      enum: ["married", "single"],
      default: "single",
    },
    emergencycontactname: { type: String, default: "" },
    emergencycontactnumber: { type: BigInt, default: 0 },
    accountnumber: { type: BigInt, default: 0 },
    ifsccode: { type: String, default: "" },

    department: {
      type: String,
      enum: ["Sales", "Marketing", "Finance", "Operations", "IT", "HR"],
      default: "HR",
    },
    designation: { type: String, required: true },
    joiningdate: { type: Date, required: true },
    employmentstatus: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Intern", "Mentor"],
      default: "Intern",
    },
    probationenddate: { type: Date, required: true },
    confirmationdate: { type: Date },
    salary: { type: Number, required: true },
    managername: { type: String, required: true },
    casualleaves: { type: Number, default: 2 },
    earnedleaves: { type: Number, default: 0 },
    maternityleaves: { type: Number, default: 0 },
    ispassupdated: { type: Boolean, enum: [true, false], default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employee", employeeSchema);
