var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
var passport = require('passport');
var Strategy = require('passport-local');

var Candidate = require('./../models/Candidate.js');
var User = require('./../models/User.js');

var University = require('./../models/University.js');



//++++++++++++++++++++
//ROUTES
//++++++++++++++++++++

//-----
//Passport
//-----

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    var user = req.user;
    res.redirect('/');
})


router.post('/register', function(req, res){
  var newUser = new User({ username: req.body.username, password: req.body.password });
  // console.log('New User', newUser);
  newUser.save(function(err, doc) {
    if(err) {
      console.log('save error', err);
    } else {
      console.log('saved', doc)
      req.login(newUser, function(err) {
        if (err) {
          console.log('login error', err);
        }
        return res.redirect('/');
      });
    }
  });
})

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

//-----
//Get Requests - Views
//-----

router.get("/", function(req, res, body) {
  var user = req.user;
  res.render('index', { user });
});

router.get("/add", function(req, res, body) {
  var user = req.user;
  res.render('add', { user });
});

router.get("/admin", function(req, res, body) {
  var user = req.user;
  res.render('admin', { user });
});

router.get("/error", function(req, res, body) {
  var user = req.user;
  res.render('error', { user });
});


// GET ALL CANDIDATES

router.get("/all", function(req, res) {
  Candidate.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

//-----
//Candidate Model
//-----

// Create a New Candidate

router.post("/submit", function(req, res) {

  var newCandidate = new Candidate(req.body);

  newCandidate.save(function(err, doc){
    if (err){
      console.log("Save Error: ", err);
    }
    else{
      console.log("Saved: ", doc);
      res.send(doc);
    }
  })
});

// Filter Candidates by Custom Parameters

router.get("/filter/", function(req, res) {

  var query = {};
  if(req.query.university) { query.university = req.query.university };
  if(req.query.role){ query.role = req.query.role };
  if(req.query.program){ query.program = req.query.program };
  if(req.query.stage){ query.stage = req.query.stage };

  // console.log("query = ", query);

  Candidate.find(query).sort({lastName:-1}).exec(function(error, found) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      // console.log("found = ", found);
      res.send(found);
    }
  });
});

// Delete a Single Candidate

router.get("/delete/:id", function(req, res) {
  Candidate.find({ _id: req.params.id }).remove(function(error, removed){
    if(error){
      console.log(error);
    }
    else{
      // console.log(removed);
      res.send(removed);
    }
  })
});

// Find a Single Candidate

router.get("/find-one/:id", function(req, res) {
  Candidate.findOne({ _id : req.params.id }, function(error, candidate){
    if (error){
      console.log(error);
      res.send(error);
    }
    else{
      console.log(candidate);
      res.send(candidate);
    }
  })
});

// Update a Single Candidate

router.post("/update/:id", function(req, res) {
  Candidate.findByIdAndUpdate(req.params.id, {
    $set: {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "university": req.body.university,
      "role": req.body.role,
      "stage": req.body.stage,
      "email": req.body.email,
      "phone": req.body.phone,
      "notes": req.body.notes,
      "program": req.body.program,
      "modified": Date.now()
    }
  }, function(error, edited) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(edited);
      res.send(edited);
    }
  });
}); 

// ++++++++++++
// PROGRAMS COLLECTION 
// ++++++++++++

// Add a New Program to Collection
router.post("/submit-program", function(req, res) {
  var newProgram = new Program(req.body);
  console.log(newProgram);
  newProgram.save(function(err, doc){
    if (err){
      console.log("Save Error: ", err);
    }
    else{
      console.log("Saved: ", doc);
      res.send(doc);
    }
  })
});

// get all programs from collection
router.get("/all-programs", function(req, res) {
  Program.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

// ++++++++++++
// SCHOOLS COLLECTION 
// ++++++++++++

// add a new school to the university collection
router.post("/submit-school", function(req, res) {
  var newUniversity = new University(req.body);
  // console.log(newUniversity);
  newUniversity.save(function(err, doc){
    if (err){
      console.log("Save Error: ", err);
    }
    else{
      console.log("Saved: ", doc);
      res.send(doc);
    }
  })
});

// get all schools from the universities collection
router.get("/all-schools", function(req, res) {
  University.find({}).sort({universityName:1}).exec(function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  })
});

// delete a school
router.get("/delete-school/:id", function(req, res) {
  University.find({ _id: req.params.id }).remove(function(error, removed){
    if(error){
      console.log(error);
    }
    else{
      console.log(removed);
      res.send(removed);
    }
  })
});

// find one school in the university collection (by unique id)
router.get("/find-one-school/:id", function(req, res) {
  University.findOne({ _id : req.params.id }, function(error, university){
    if (error){
      console.log(error);
      res.send(error);
    }
    else{
      console.log(university);
      res.send(university);
    }
  })
});

module.exports = router;