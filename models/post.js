const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content:{
    type:String,
    require:true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
     ref:'User',
  },
   //to find out al comment inside the post
  comments:[
    {
      type: mongoose.Schema.Types.ObjectId,
        ref:'Comment',
    }]
},
  {
    timestamps: true // Include the timestamps option here
  }
  );
  const Post = mongoose.model('Post', postSchema);
  module.exports = Post;
  // an entry is created in database

