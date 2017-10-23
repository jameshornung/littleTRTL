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
//Get Requests
//-----

router.get("/", function(req, res, body) {
  var user = req.user;
  res.render('index', { user });
});

router.get("/add", function(req, res, body) {
  var user = req.user;
  res.render('add', { user });
});

router.get("/potential-hires", function(req, res, body) {
  var user = req.user;
  res.render('potentials', { user });
});

router.get("/existing-pipeline", function(req, res, body) {
  var user = req.user;
  res.render('existing', { user });
});

router.get("/do-not", function(req, res, body) {
  var user = req.user;
  res.render('no', { user });
});

router.get("/admin", function(req, res, body) {
  var user = req.user;
  res.render('admin', { user });
});

router.get("/error", function(req, res, body) {
  var user = req.user;
  res.render('error', { user });
});

router.get("/success", function(req, res, body) {
  var user = req.user;
  // console.log("success: ", user);
  res.render('success', { user });
});



// // get all candidates in the collection
router.get("/all", function(req, res) {
  Talent.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

// find a single candidate (by unique id)
// app.get("/find-one/:id", function(req, res) {
//   Candidate.findOne({ _id : req.params.id }, function(error, candidate){
//     if (error){
//       console.log(error);
//       res.send(error);
//     }
//     else{
//       console.log(candidate);
//       res.send(candidate);
//     }
//   })
// });


// ++++++++++++++++
// Filter By Custom Parameters
// ++++++++++++++++

// POTENTIAL HIRES

router.get("/filter/", function(req, res) {

  var query = {};
  // console.log("req.query", req.query)

  if(req.query.university) { query.university = req.query.university };
  if(req.query.role){ query.role = req.query.role };
  if(req.query.program){ query.program = req.query.program };
  if(req.query.stage){ query.stage = req.query.stage };

  // console.log("query = ", query);

  Talent.find(query).sort({lastName:-1}).exec(function(error, found) {
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

// delete a single candidate from Potential Hires
router.get("/delete/:id", function(req, res) {
  Talent.find({ _id: req.params.id }).remove(function(error, removed){
    if(error){
      console.log(error);
    }
    else{
      console.log(removed);
      res.send(removed);
    }
  })
});

// Find a single candidate in Potential Hires
router.get("/find-one/:id", function(req, res) {
  Talent.findOne({ _id : req.params.id }, function(error, candidate){
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

// update a single candidate in Potential Hires
router.post("/update/:id", function(req, res) {
  Talent.findByIdAndUpdate(req.params.id, {
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

// EXISTING PIPELINE

router.get("/filter-existing/", function(req, res) {

  var query = {};
  // console.log("req.query", req.query)

  if(req.query.university) { query.university = req.query.university };
  if(req.query.role){ query.role = req.query.role };
  if(req.query.program){ query.program = req.query.program };
  if(req.query.stage){ query.stage = req.query.stage };

  console.log("query = ", query);

  Existing.find(query).sort({lastName:-1}).exec(function(error, found) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log("found = ", found);
      res.send(found);
    }
  });
});

// // delete a single candidate from Existing Pipeline
router.get("/delete-existing/:id", function(req, res) {
  Existing.find({ _id: req.params.id }).remove(function(error, removed){
    if(error){
      console.log(error);
    }
    else{
      console.log(removed);
      res.send(removed);
    }
  })
});

// Do Not Move Forward

router.get("/filter-no/", function(req, res) {

  var query = {};

  if(req.query.university) { query.university = req.query.university };
  if(req.query.role){ query.role = req.query.role };
  if(req.query.program){ query.program = req.query.program };
  if(req.query.stage){ query.stage = req.query.stage };

  DoNot.find(query, function(error, found) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log("found = ", found);
      res.send(found);
    }
  });
});

// // delete a single candidate from Do Not Move Forward collection
router.get("/delete-no/:id", function(req, res) {
  DoNot.find({ _id: req.params.id }).remove(function(error, removed){
    if(error){
      console.log(error);
    }
    else{
      console.log(removed);
      res.send(removed);
    }
  })
});

//-----
//Post Requests
//-----

// Submit To Potential Hires
router.post("/submit", function(req, res) {

  var newTalent = new Talent(req.body);

  console.log(newTalent);
  
  console.log("Added to Talent Pool: ", newTalent);

  newTalent.save(function(err, doc){
    if (err){
      console.log("Save Error: ", err);
    }
    else{
      console.log("Saved: ", doc);
      res.send(doc);
    }
  })
});

// Submit To Existing Pipeline
router.post("/submit-existing", function(req, res) {

	console.log("req.body", req.body);

  var newExisting = new Existing(req.body);

  console.log(newExisting);
  
  console.log("Added to Existing Pipeline: ", newExisting);

  newExisting.save(function(err, doc){
    if (err){
      console.log("Save Error: ", err);
    }
    else{
      console.log("Saved: ", doc);
      res.send(doc);
    }
  })
});

// Submit To Do Not Move Forward
router.post("/submit-no", function(req, res) {

	console.log("req.body", req.body);

  var newDoNot = new DoNot(req.body);
  
  console.log("Added to Do Not Move Forward: ", newDoNot);

  newDoNot.save(function(err, doc){
    if (err){
      console.log("Save Error: ", err);
    }
    else{
      console.log("Saved: ", doc);
      res.send(doc);
    }
  })
});

// update a single candidate
// app.post("/update/:id", function(req, res) {
//   Candidate.findByIdAndUpdate(req.params.id, {
//     $set: {
//       "firstName": req.body.firstName,
//       "lastName": req.body.lastName,
//       "university": req.body.university,
//       "status": req.body.status,
//       "modified": Date.now()
//     }
//   }, function(error, edited) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log(edited);
//       res.send(edited);
//     }
//   });
// }); 

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


// update an existing school in the university collection
// app.post("/update-school/:id", function(req, res) {
//   University.findByIdAndUpdate(req.params.id, {
//     $set: {
//       "universityName": req.body.universityName,
//       "campusLocation": req.body.campusLocation,
//       "modified": Date.now()
//     }
//   }, function(error, edited) {
//     if (error) {
//       console.log(error);
//       res.send(error);
//     }
//     else {
//       console.log(edited);
//       res.send(edited);
//     }
//   });
// });

module.exports = router;