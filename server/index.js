require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authHrRoutes = require("./routes/auth");
const addEmployeeRoutes = require("./routes/employee");
const clockinoutRoutes = require("./routes/clockinout");
const imageRoutes = require("./routes/image");
const meetingRoutes = require("./routes/meeting");
const leaveRoutes = require("./routes/leave");
const timesheetRoutes = require("./routes/timesheet");
const holidayRoutes = require("./routes/holiday");
const notificationRoutes = require("./routes/notification");
const MongoDbStore = require("connect-mongo");
const session = require("express-session");
const app = express();
const PORT = 3000;
// mongoose
//   .connect("mongodb://0.0.0.0:27017/HRM", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.log("MongoDB connection error", error);
//   });
mongoose.set("strictQuery", false);
const url =
  "mongodb+srv://bhavyabansal0916:y3pSoxrLeu64jWCP@cluster0.vpofow2.mongodb.net/HRM";
// mongodb+srv://bhavyabansal0916:<password>@cluster0.vpofow2.mongodb.net/
mongoose.connect(url, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: true,
});
const conn = mongoose.connection;
conn
  .once("open", () => {
    console.log("Database Connected");
  })
  .on("error", function (err) {
    console.log("Database Not Connected");
  });
//Session Store
let mongoStore = MongoDbStore.create({
  mongoUrl: url,
  collection: "sessions",
});
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 Hours
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authHrRoutes);
app.use("/api/employee", addEmployeeRoutes);
app.use("/api/clockinout", clockinoutRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/timesheet", timesheetRoutes);
app.use("/api/holiday", holidayRoutes);
app.use("/api/notification", notificationRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
