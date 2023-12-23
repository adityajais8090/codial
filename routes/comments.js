const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controller/comments_controller');

router.post('/create', passport.checkAuthentication , commentController.comment);
router.get('/destroy/:id', passport.checkAuthentication , commentController.destroy );

module.exports = router;