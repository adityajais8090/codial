const express = require ('express');
const router = express.Router();
const passport = require('passport');


const userController = require('../controller/user_controller');

//use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate('local', {failureRedirect:'/users/sign-in'}),
userController.createSession);


router.get('/profile', passport.checkAuthentication ,userController.profile);

router.post('/create',userController.create);
router.post('/createSession', userController.createSession);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.get('/sign-out', userController.destroySession);

router.use('/social', require('./post'));
module.exports = router;

