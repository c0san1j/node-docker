const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/signup').post(userController.signUp);
router.route('/login').post(userController.logIn);

module.exports = router;
