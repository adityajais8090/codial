module.exports.profile = function(req,res){
    return res.render('user', {
        title:"user"
    });
    //res.end('<h1>User profile</h1>');
}