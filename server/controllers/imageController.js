const Image = require("../models/Image");
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
