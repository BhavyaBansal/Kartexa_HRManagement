const Image = require("../models/Image");
const multer = require("multer");
const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");
exports.uploadImage = (req, res) => {
  const { empId, name, url } = req.body;
  Image.findOne({ empId: empId }).then((img) => {
    if (!img) {
      const image = new Image({
        empId,
        name,
        url,
      });
      image
        .save()
        .then(() => {
          res.status(200).json({ Success: "Image Uploaded Successsfully" });
          // res.redirect()
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to Save Image" });
        });
    } else {
      const id = img._id;
      Image.findByIdAndUpdate(id, { url, name }, { new: true })
        .then((updatedUrl) => {
          res.status(200).json({ Success: "Image Updated Successfully" });
        })
        .catch((error) => {
          res.status(500).json({ error: "Server Error" });
        });
    }
  });
};

exports.findImageUrlById = (req, res) => {
  const { empId } = req.body;
  Image.findOne({ empId: empId }).then((img) => {
    if (!img) {
      res.status(200).json({ url: "" });
    } else {
      res.status(200).json({ url: img.url });
    }
  });
};

exports.deleteImage = (req, res) => {
  const { empId } = req.params;
  Image.findOne({ empId: empId }).then((img) => {
    if (img) {
      const id = img._id;
      Image.findByIdAndDelete(id)
        .then((deletedImage) => {
          if (!deletedImage) {
            return res.status(404).json({ message: "Image Not Found" });
          }
          res.status(200).json({ Success: "Image Deleted Successfully" });
        })
        .catch((error) => {
          console.log("Error Deleating Image", error);
          res.status(500).json({ error: "Server Error" });
        });
    }
  });
};

// exports.uploadImageInFolder = (req, res) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => {
//     console.log(reader.result);
//   });
//   reader.readAsDataURL(this.files[0]);
//   const storageEngine = multer.diskStorage({
//     destination: "./images",
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}--${file.originalname}`);
//     },
//   });

//   const checkFileType = function (file, cb) {
//     //Allowed file extensions
//     const fileTypes = /jpeg|jpg|png|gif|svg/;

//     //check extension names
//     const extName = fileTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );

//     const mimeType = fileTypes.test(file.mimetype);

//     if (mimeType && extName) {
//       return cb(null, true);
//     } else {
//       cb("Error: You can Only Upload Images!!");
//     }
//   };
//   const upload = multer({
//     storage: storageEngine,
//     limits: { fileSize: 1000000 },
//     fileFilter: (req, file, cb) => {
//       checkFileType(file, cb);
//     },
//   });
//   upload.single("image");
// };
