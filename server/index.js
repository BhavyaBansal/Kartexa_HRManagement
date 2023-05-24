require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authHrRoutes = require("./routes/auth");
const addEmployeeRoutes = require("./routes/employee");
const MongoDbStore = require("connect-mongo");
// const multer = require('')
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
const url = "mongodb://127.0.0.1/HRM";
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/auth", authHrRoutes);
app.use("/api/employee", addEmployeeRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
