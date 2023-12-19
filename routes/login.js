const express = require('express');
const router = express.Router();

const loginController = require('../controller/login_controller');

router.post('/', loginController.login);

module.exports = router;