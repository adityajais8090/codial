const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const user = require('./models/user');
const cookiesParser = require('cookie-parser');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//used for jwt-passport auth 
const passportJWT = require('./config/passport-jwt-strategy');



app.use(sassMiddleware({
  src:'./assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'extended',
  prefix:'/css'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiesParser());

app.use(express.static('./assets'));

app.set('layouts extractStyles', true);
app.set('layouts extractScripts', true);

app.use(expressLayouts);



app.set('view engine', 'ejs');
app.set('views', './views');

//middleware takes the session cookie and encrypt it 

app.use(session({
  name: 'codeial',
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/',
    autoRemove: 'disabled'
  }, function (err) {
    console.log(err || 'connect mongo-db ');
  }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));
app.use('/users', require('./routes'));
app.use('/signin', require('./routes'));
app.use('/posts', require('./routes'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api', require('./routes'));

app.listen( port, function(err){
  if(err){
   // console.log('Error in listen:'. err);
   console.log(`Errror in running server: ${err}`);
  }
    console.log(`Server is running on port: ${port}`);
});
































// {
//   "message": "sign in successfully, here is your token",
//   "data": {
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFfamFpc3dhbEBlY2UuaWl0ci5hYy5pbiIsInBhc3N3b3JkIjoiODA5MCIsIm5hbWUiOiJBRElUWUEgSkFJU1dBTCIsImF2YXRhciI6IlxcdXBsb2Fkc1xcdXNlcnNcXGF2YXRhci9hdmF0YXItMTcwMzc0MjY3NDY3MSIsImlhdCI6MTcwMzc1NzYwNCwiZXhwIjoxNzAzNzU3NzA0fQ.1c2fp54crTU79ZXbRbQ56syAv_6yOzrTJAi8JQ7CYTE"
//   }
// }