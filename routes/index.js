const express = require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');
router.get('/',homeController.home);

  
router.use('/users', require('./user'));
router.use('/signin', require('./login'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api', require('./api'));


module.exports = router;
console.log('route loaded in main index.js');