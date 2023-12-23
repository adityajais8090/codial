const db = require('../config/mongoose');
const Post = require('../models/post');
const mongoose = require('mongoose');
const Comment = require('../models/comment');


module.exports.comment = async function(req,res){
    console.log(req.body);
    console.log(req.user._id);

    try{  
        const post = await Post.findById(req.body.post).exec();
        if(post){
            const comment = await Comment.create({
                content:req.body.comments,
                user:req.user._id,
                post:req.body.post,
            });
            if(comment){
                post.comments.push(comment);
                console.log(comment.content);
                await post.save();
                console.log('Newtext commented', comment);
                return res.redirect('/');
            }
        }
    } catch(err){
        if(err){
            console.error('Error in finding or creating user:',err);
        }
            return res.redirect('back');
    }
}

module.exports.destroy = async function(req,res){
    try{
        const comment = await Comment.findById(req.params.id).exec();
        if(comment){
            if(comment.user == req.user.id){
                let postId = comment.post;
               await comment.deleteOne();
               const post =  Post.findByIdAndUpdate(postId,{ $pull:
                { comments:req.params.id}}).exec();
                if(post){
                    return res.redirect('back');
                }
               
            }else{
                return res.redirect('back');
            }
        }else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Finding error in deleting comment', err);
        return res.redirect('back');
    }
}