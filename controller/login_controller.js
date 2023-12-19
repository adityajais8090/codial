const db = require('../config/mongoose');
const user = require('../models/user');


module.exports.login = async function(req,res){
    try{
        const newProfile = await user.create({
         emails: req.body.emails,
         password:req.body.password,
         username:req.body.username,
         title:"login"
        });
        console.log('******', newProfile);
        return res.redirect('back');
    }
    catch(err){
            console.error('Error in creating a contact:', err);
            return res.redirect('back');
        }
    };
    // return res.render('login', {
    //     title:"login"
    // });
