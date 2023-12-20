const express = require ('express');
const router = express.Router();


const userController = require('../controller/user_controller');


router.post('/profile', userController.profile);

router.post('/create',userController.create);
router.post('/createSession', userController.createSession);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);



router.use('/social', require('./post'));
module.exports = router;

