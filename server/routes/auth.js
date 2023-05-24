const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController');
console.log("Helloo auth");
// router.use(express.json());
router.post('/signup',hrController.signup);
router.post('/signin',hrController.signin);
// router.post('/login',hrController.login);
module.exports = router;