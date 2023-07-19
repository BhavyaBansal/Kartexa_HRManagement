const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
console.log("Hello Image");
router.post("/uploadImage", imageController.uploadImage);
router.post("/findImageUrlById", imageController.findImageUrlById);
router.delete("/deleteImage/:empId", imageController.deleteImage);
// router.post("/uploadimageinfolder", imageController.uploadImageInFolder);
module.exports = router;
