

const db = require('../config/mongoose');
const Post = require('../models/post');
const mongoose = require('mongoose');
const Comment = require('../models/comment');


module.exports.post = async function(req,res){
    //to do later
try{  
    const comment = await Comment.find({}).populate('post').exec();
    const newText = await Post.create({
        content:req.body.content,
        user:req.user._id,
        comment:[]
    });

    if(req.xhr){
        return res.status(200).json({
            data : {
                post: newText,
                message: 'post-created!'
            }
        });
    }
    console.log('Newtext posted', newText);
    req.flash('success', 'Posted Succesfully');
    return res.redirect('/');

} catch(err){
    if(err){
        console.error('Error in finding or creating user:', err);
    }
        return res.redirect('back');
}
}


module.exports.destroy = async function(req,res){
try{
    const post = await Post.findById(req.params.id).exec();
    if(post){
        if(post.user == req.user.id){
            await post.deleteOne();
            Comment.deleteMany({ post:req.params.id });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id: req.params.id },
                    message: "Post deleted",
                });
            }
        }
            req.flash('success', 'Post deleted');
            return res.redirect('back');

        }else {
            return res.redirect('back');
        }    
    }

catch(err){
    console.log('find error in deleting post', err);
    return res.redirect('back');
}
}
