const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

//use express router
app.use('/',require('./routes'));
app.use('/users', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen( port, function(err){
  if(err){
   // console.log('Error in listen:'. err);
   console.log(`Errror in running server: ${err}`);
  }
    console.log(`Server is running on port: ${port}`);
});