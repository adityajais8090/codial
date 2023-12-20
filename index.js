const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const user = require('./models/user');
const cookiesParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiesParser());

app.use(express.static('./assets'));

app.set('layouts extractStyles', true);
app.set('layouts extractScripts', true);

app.use(expressLayouts);


//use express router
app.use('/',require('./routes'));
app.use('/users', require('./routes'));
app.use('/signin', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen( port, function(err){
  if(err){
   // console.log('Error in listen:'. err);
   console.log(`Errror in running server: ${err}`);
  }
    console.log(`Server is running on port: ${port}`);
});

