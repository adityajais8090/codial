// user_controller.js
const db = require('../config/mongoose');
const User = require('../models/user');

// Render the create form
module.exports.create = function(req, res){
    return res.render('user', {
        title: "Create Profile",
    });
};

// Handle form submission and display user data
module.exports.profile = async function (req, res) {
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
