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
    probationenddate: { type: Date },
    confirmationdate: { type: Date },
    salary: { type: Number, required: true },
    finalsalary: { type: Number, required: true, default: 0 },
    managername: { type: String },

    casualleaves: { type: Number, default: 2, required: true }, // it will decrease and reloaded every month
    sickleaves: { type: Number, default: 0, required: true }, // it will increase and will be paid and reloaded every month
    earnedleaves: { type: Number, default: 10, required: true }, // it will increase per year if casual leaves are not more than 24
    maternityleaves: { type: Number, default: 30, required: true }, // it is for womens before or after giving birth
    totalcasualleaves: { type: Number, default: 0, required: true }, // it will increase whenever a leave is made reloaded every year
    totalsickleaves: { type: Number, default: 0, required: true },
    totalearnedleaves: { type: Number, default: 0, required: true },
    totalmaternityleaves: { type: Number, default: 0, required: true },
    totalleavesmade: { type: Number, default: 0, required: true },
    currentmonth: {
      type: Number,
      default: new Date().getMonth() + 1,
      required: true,
    },
    currentyear: {
      type: Number,
      default: new Date().getFullYear(),
      required: true,
    },

    ispassupdated: { type: Boolean, enum: [true, false], default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Employee", employeeSchema);
