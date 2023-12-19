//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/codeial_development');

//acquire the connection to  check (is it succesful) 
const db = mongoose.connection;
//error
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running then print the message
db.once('open', function(){
  
console.log("Succesully connected to database")

});

module.exports = db;