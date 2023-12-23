const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  content:{
    type:String,
    require:true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
     ref:'User',
  },
  post : {
    type : mongoose.Schema.Types.ObjectId,
    ref:'Post',
  },
  
},
  {
    timestamps: true // Include the timestamps option here
  }
  );
  const Comment = mongoose.model('Comment', commentSchema);
  module.exports = Comment;
  // an entry is created in database

