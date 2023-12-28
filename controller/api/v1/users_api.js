const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


function usertoJSON(user) {
    return {
        email: user.email,
        password: user.password,
        name: user.name,
        avatar: user.avatar,
        // Include other properties as needed
    };
}

module.exports.createSession = async function(req,res){
    try{
        
        let existingUser = await User.findOne({ email: req.body.email }).exec();
        if(!existingUser || existingUser.password !== req.body.password){ 

                 return res.json(422, {
                    message: "Invalid Username or Passsword",
                 });
                };
                let user1 = usertoJSON(existingUser);
                let token = jwt.sign(user1 , 'codeial', { expiresIn: '100000' });

                return res.json(200, {
                    message : "sign in successfully, here is your token",
                    data: {token},
                });
                

        //     }
        //     res.cookie('user_id', existingUser.id);
        //     return res.redirect('/users/profile');
        // } else {
        //     return res.redirect('back');
        // }
    } catch(err){
        console.error('Error in finding or creating session user:', err);
        req.flash('error', 'Error in Username/Password');
        return res.json( 500 , {
            message: "Internal Server Error" });
        };
    
    //to do later
};