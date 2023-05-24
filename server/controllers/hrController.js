const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Hr = require("../models/Hr");

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
              { expiresIn: "1h" }
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
