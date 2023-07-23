const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
console.log("Hello Notification");
router.post("/addnotification", notificationController.addNotification);
router.post(
  "/getnotificationsbydate",
  notificationController.getNotificationsByDate
);
module.exports = router;
