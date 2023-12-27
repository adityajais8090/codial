const express = require ('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Post = require('../models/post');

const userController = require('../controller/user_controller');
const homeController = require('../controller/home_controller');

//use passport as a middleware to authenticate
router.post('/createSession', passport.authenticate('local', {failureRedirect:'/users/sign-in'}),
userController.createSession);


router.get('/profile/:id', passport.checkAuthentication ,userController.profile);

router.post('/create',userController.create);
router.post('/createSession', userController.createSession);
router.post('/update/:id', userController.update);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

router.get('/sign-out', userController.destroySession);

router.use('/social', require('./posts'));
module.exports = router;

