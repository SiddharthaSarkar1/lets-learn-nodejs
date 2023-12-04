const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router.post('/signup', authController.createUser);
router.post('/login', authController.login);

exports.router = router;