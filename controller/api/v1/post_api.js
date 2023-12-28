const db = require('../../../config/mongoose');
const Post = require('../../../models/post');
const mongoose = require('mongoose');
const User = require('../../../models/user');
const Comment = require('../../../models/comment');





// if(posts){
//    const users = User.find({}).exec();
//      res.render( 'home' , { 
//        message : "create a pot through api",
//         posts:posts,
// });
// }
// else 
// {
// if(err){
// console.error('Error in printing posts:', err);
//     return res.redirect('back');
// }
// };


module.exports.index = async function(req,res){

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
           path:'comments',
           populate: {
            path:'user'
           }
        })
        .exec();
            return res.json(200, {
                message: "Lists of posts",
                posts:posts,
            })
    }
    catch(err){
        if(err){
            console.log('Finding error in rendering api index v1', err);
        }}} ;





 
   module.exports.destroy = async function(req,res){
try{

    
// Now you can call remove on the post instance
    let post = await Post.findById(req.params.id).exec();
    if(post){
        if(post.user == req.user.id){
            await post.deleteOne();
            Comment.deleteMany({ post:req.params.id });
        
            req.flash('success', 'Post deleted');
            return res.json(200, {
                message : "post deleted",
            });
        } else {
            return res.json(401, {
                message: "You cannot delete the post!",
            });
        }
        // }   
    // }else {
    //     return res.json(401, {
    //         message : "post not get deleted",
    //     });
    // }
}}
catch(err){
    console.log('find error in deleting post', err);
    return res.json(401, {
        message : 'Invalid Find Error',
    });
}
}


