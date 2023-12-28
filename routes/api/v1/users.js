const usersAPI = require('../../../controller/api/v1/users_api');
const express = require('express');
const router = express.Router();




router.post('/create-session', usersAPI.createSession);

module.exports = router;
