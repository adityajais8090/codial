const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar');
const userSchema = new mongoose.Schema({
  email:{
    type:String,
    require:true,
    unique:true,
  },
  password:{
    type:String,
    require:true
  },
  name:{
    type:String,
    require:true
  },
avatar:{
  type: String,
}});
  
  


  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

        //static method
userSchema.statics.uploadedAvatar = multer({
  storage:storage
}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

//ensure that this isn always at lower
console.log('load schema succesfully');
  const User = mongoose.model('User', userSchema);
  module.exports = User;


