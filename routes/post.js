const express = require('express');
const router = express.Router();

const postController = require('../controller/post_controller');

router.get('/', postController.post);

module.exports = router;