const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Hr = require("../models/Hr");
// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");
exports.signup = (req, res) => {
  // console.log(req.body);
  const { fullname, phonenumber, email, password } = req.body;
  // console.log(req.body);
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ error: "Failed to create Hr" });
    } else {
      const hr = new Hr({
        fullname,
        phonenumber,
        email,
        password: hashedPassword,
      });
      hr.save()
        .then(() => {
          res.status(200).json({ error: "Hr Created Successsfully" });
          // res.redirect()
        })
        .catch((err) => {
          res.status(500).json({ error: "Failed to create Hr" });
        });
    }
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;

  Hr.findOne({ email: email })
    .then((hr) => {
      if (!hr) {
        res.status(401).json({ error: "Invalid Username" });
      } else {
        bcrypt.compare(password, hr.password, (err, result) => {
          if (err) {
            res.status(500).json({ error: "An Error Occured" });
          } else if (!result) {
            res.status(401).json({ error: "Invalid Password" });
          } else {
            const id = hr._id;
            const ema = hr.email;
            const token = jwt.sign(
              { hrId: id, email: hr.email },
              "secret-key-top-secret",
              { expiresIn: "1d" }
            );
            res.status(200).json({ token, id, ema });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "An Error Occured" });
    });
};

exports.sendEmail = (req, res) => {
  const { mailOptions } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "kanhabansal0916@gmail.com",
      pass: "gjifsofmwobnslvz",
    },
  });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({ message: "Email Sent Successfully" });
      console.log("Email Sent:" + info.response);
    }
  });
};

exports.updatePasswordByEmail = (req, res) => {
  const { email, password } = req.body;
  Hr.findOne({ email: email }).then((hr) => {
    if (!hr) {
      res.status(404).json({ Error: "HR Not Found" });
    } else {
      const id = hr._id;
      bcrypt.hash(password, 10, (err, hashedpassword) => {
        if (err) {
          res.status(500).json({ Error: "Failed to Update Hr Password" });
        } else {
          Hr.findByIdAndUpdate(id, { password: hashedpassword }, { new: true })
            .then((updatedhr) => {
              res
                .status(200)
                .json({ Success: "Password Updated Successfully" });
            })
            .catch((error) => {
              res.status(500).json({ message: "Server Error" });
            });
        }
      });
    }
  });
};
