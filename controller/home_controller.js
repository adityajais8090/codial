

const db = require('../config/mongoose');
const Post = require('../models/post');
const mongoose = require('mongoose');


module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
   try { 
    const posts = await Post.find({})
    .populate('user')
    .populate({
       path:'comments',
       populate: {
        path:'user'
       }
    })
    .exec();
    if(posts){
        return res.render('home', { 
            title:"Home",
            posts:posts,
        
    });
}} 
catch(err){
    console.error('Error in printing posts:', err);
        return res.redirect('back');
}

}
    //find one id and text associated with it carry forward it to the view page 
    //if else statement accordingly
    

    //this below command directly send to web browser
   // return res.end('<h1>Express is up for codial</h1>');


