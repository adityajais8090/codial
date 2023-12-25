const mongoose = require('mongoose');
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
  }});
  console.log('load schema succesfully');
  const User = mongoose.model('User', userSchema);
  module.exports = User;

