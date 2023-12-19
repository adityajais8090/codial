const express = require ('express');
const router = express.Router();


const userController = require('../controller/user_controller');


router.post('/profile', userController.profile);

router.get('/create',userController.create);
router.use('/social', require('./post'));
module.exports = router;

