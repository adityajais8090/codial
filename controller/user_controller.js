// user_controller.js
const db = require('../config/mongoose');
const User = require('../models/user');
const mongoose = require('mongoose');

//render the signup page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title:"Codial | Signup"
    })
}

module.exports.create = async function(req, res) {
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email }).exec();

        if (existingUser) {
            console.log('User with the provided email already exists');
            return res.redirect('back');
        }

        // Create a new user
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            // other fields
        });

        console.log('New user created:', newUser);
        return res.redirect('/users/sign-in');
    } 
    
    catch (err) {
        console.error('Error in finding or creating user:', err);
        return res.redirect('back');
    }
};

module.exports.createSession = async function(req,res){
    try{
        
        // const existingUser = await User.findOne({ email: req.body.email }).exec();
        // if(existingUser){ 
            req.flash('success', 'Logged in Succesfully');
            return res.redirect('/');
        // }
        //     if(existingUser.password !== req.body.password){
        //         return res.redirect('back');
        //     }
        //     res.cookie('user_id', existingUser.id);
        //     return res.redirect('/users/profile');
        // } else {
        //     return res.redirect('back');
        // }
    } catch(err){
        console.error('Error in finding or creating session user:', err);
        req.flash('error', 'Error in Username/Password');
        return res.redirect('/sign-in');
    }
    //to do later
};



module.exports.profile = async function (req, res) {
    try{
    const profile_user = await User.findById(req.params.id).exec();
    if(profile_user){
        return res.render('profile',{
            title:"Profile page",
            profile_user:profile_user,
         })
    }
    }
    catch(err){
        console.error('Error in move to profile page:', err);
         return res.redirect('/');
    }
}
//     try {
//         return res.render
//         // if (req.cookies.user_id) {
//         //     // Check if req.cookies.user_id is a valid ObjectId
//         //     if (!mongoose.Types.ObjectId.isValid(req.cookies.user_id)) {
//         //         return res.redirect('/users/sign-in');
//         //     }

//         //     const existingUser = await User.findById(req.cookies.user_id).exec();

//         //     if (existingUser) {
//         //         return res.render('profile', {
//         //             title: "Profile Page",
//         //             user: existingUser
//         //         });
//         //     } else {
//         //         return res.redirect('/users/sign-in');
//         //     }
//         // }
//     } catch (err) {
//         console.error('Error in finding user by ID:', err);
//         return res.redirect('/users/sign-in');
//     }
// };



//render the signin page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in',{
       title:"Codinal | sign IN"
    } )
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.error('Error in destroying session:', err);
            return res.redirect('/');
        }

        req.flash('success', 'Logged out Successfully');
        return res.redirect('/');
    });
}


module.exports.update = async function(req,res){
    try{
        if(req.user.id == req.params.id){
            const user = User.findByIdAndUpdate(req.params.id, req.body).exec();
            req.flash('success', 'Updated Succesfully');
            return res.redirect('back');
        } else {
            return res.status(401).send('Unauthiorized');
        }
    }
    catch(err){
        console.log('Error in Updating of Id', err);
        return res.redirect('back');

    }
   
}




















// Render the create form
module.exports.createeeeeee = function(req, res){
    return res.render('user', {
        title: "Create Profile",
    });
};

// Handle form submission and display user data
module.exports.profileeeeeeeeee = async function (req, res) {
    try {
        console.log('req.body:', req.body);

        // Create a new user
        const newProfile = await User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        });

        console.log('****** New Profile:', newProfile);

        // Fetch all users from the database
        const users = await User.find({}).exec();

        // Render the user view with the list of users
        return res.render('user', {
            title: "Create Profile",
            users: users
        });
    } catch (err) {
        console.error('Error in creating a contact:', err);
        return res.redirect('back');
    }
};
