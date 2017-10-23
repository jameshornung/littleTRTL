//++++++++++++++++++++
//DEPENDENCIES
//++++++++++++++++++++

var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require('express-handlebars');
var passport = require('passport');
var Strategy = require('passport-local');

mongoose.Promise = Promise;

//++++++++++++++++++++
//MODELS
//++++++++++++++++++++

var Talent = require("./models/Talent.js");
var University = require("./models/University.js");

var User = require('./models/User.js');

//++++++++++++++++++++
//DECLARE THE APP
//++++++++++++++++++++

var app = express();

//++++++++++++++++++++
//CONFIGURE THE APP
//++++++++++++++++++++

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + '/public'));

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

var routes = require('./controllers/controller.js');
app.use('/', routes);

//++++++++++++++++++++
//DATABASE CONFIGURATION
//++++++++++++++++++++

// localhost connection
mongoose.connect('mongodb://localhost/trtl');

// mlab connection (for talentPool database)
// mongoose.connect("mongodb://james:ellis@ds157584.mlab.com:57584/heroku_bwvb9wc7");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//++++++++++++++++++++
//PASSPORT CONFIGURATION
//++++++++++++++++++++

passport.use(new Strategy(
  function(username, password, cb) {
    User.findOne({username: username}, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  // console.log(db)
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


//++++++++++++++++++++
//LISTEN ON PORT 3000
//++++++++++++++++++++

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Success: Running on Port 3000");
});
