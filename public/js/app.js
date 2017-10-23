 $(document).ready(function() {

// ++++++++++
// Global Variables
// ++++++++++

var resultsSection = document.getElementById("results");
var request = new XMLHttpRequest();

// ++++++++++
// Materialize Functionality
// ++++++++++

$('select').material_select();
$('.modal').modal();

// ++++++++++
// Click Events
// ++++++++++


// ADD TO TALENT POOL
$(document).on("click", "#addTalent", function(){

  var data = "firstName=" + document.getElementById("firstName").value + "&lastName=" + document.getElementById("lastName").value + "&email=" + document.getElementById("email").value + "&phone=" + document.getElementById("phone").value + "&university=" + document.getElementById("university").value + "&program=" + document.getElementById("program").value+ "&stage=" + document.getElementById("stage").value + "&role=" + document.getElementById("role").value + "&notes=" + document.getElementById("notes").value;

  request.open('POST', '/submit', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
  });

// DELETE FROM TALENT POOL
$(document).on("click", ".deleter", function() {
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    url: "/delete/" + selected.attr("data-id"),
    success: function(response) {
      selected.remove();
      // $("#firstName").val("");
      // $("#lastName").val("");
      // $("#university").val("");
      // $("#status").val("");
    }
  });
});

// UPDATE FORM MODAL (CLICK UPDATE OPTION)
$(document).on("click", "#updatePotential", function() {
  generateUpdateUniversities();
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    url: "/find-one/" + selected.attr("data-id"),
    success: function(data) {
      // Fill the inputs on the update form with the data that the ajax call collected
      $("#updateFirstName").val(data.firstName);
      $("#updateLastName").val(data.lastName);
      $("#updateEmail").val(data.email);
      $("#updatePhone").val(data.phone);
      // These values not populating in select field
      
      $("#updateRole").val(data.role);
      $("#updateUniversity").val(data.university);
      $("#updateStage").val(data.stage);
      $("#updateProgram").val(data.program);

      $("#updateNotes").val(data.notes);
      $('select').material_select();
      // Add a submit button to the form
      $("#updateButtonHolder").html("<button class='submitButton updateProspect modal-action modal-close' data-id='" + data._id + "'>Submit</button>");
    }
  });
});

// UPDATE IN POTENTIAL HIRES (SUBMIT UPDATE FORM)
$(document).on("click", ".updateProspect", function() {
  // Save the selected element
  var selected = $(this);
  console.log("selected ", selected);
  $.ajax({
    type: "POST",
    url: "/update/" + selected.attr("data-id"),
    dataType: "json",
    data: {
      firstName: $("#updateFirstName").val(),
      lastName: $("#updateLastName").val(),
      university: $("#updateUniversity").val(),
      email: $("#updateEmail").val(),
      phone: $("#updatePhone").val(),
      notes: $("#updateNotes").val(),
      stage: $("#updateStage").val(),
      program: $("#updateProgram").val(),
      role: $("#updateRole").val()
      
    },
    // On successful call
    success: function(data) {
      // Clear the inputs
      $("#updateFirstName").val("");
      $("#updateLastName").val("");
      $("#updateEmail").val("");
      $("#updatePhone").val("");
      $("#updateNotes").val("");
      $("#updateUniversity").val("");
      $("#updateStage").val("");

      //remove the update button
      $("#updateButtonHolder").empty();

      //empty the results div
      $("#results").empty();
    }
  });
});

// ADD TO EXISTING PIPELINE
$(document).on("click", "#addExisting", function(){

  var data = "firstName=" + document.getElementById("firstName").value + "&lastName=" + document.getElementById("lastName").value + "&email=" + document.getElementById("email").value + "&phone=" + document.getElementById("phone").value + "&university=" + document.getElementById("university").value + "&program=" + document.getElementById("program").value+ "&stage=" + document.getElementById("stage").value + "&role=" + document.getElementById("role").value + "&notes=" + document.getElementById("notes").value;

  request.open('POST', '/submit-existing', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
  });

// DELETE FROM EXISTING PIPELINE
$(document).on("click", ".deleteExisting", function() {
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    url: "/delete-existing/" + selected.attr("data-id"),
    success: function(response) {
      selected.remove();
      // $("#firstName").val("");
      // $("#lastName").val("");
      // $("#university").val("");
      // $("#status").val("");
    }
  });
});

// ADD TO DO NOT MOVE FORWARD LIST
$(document).on("click", "#addNix", function(){

  var data = "firstName=" + document.getElementById("firstName").value + "&lastName=" + document.getElementById("lastName").value + "&email=" + document.getElementById("email").value + "&phone=" + document.getElementById("phone").value + "&university=" + document.getElementById("university").value + "&program=" + document.getElementById("program").value+ "&stage=" + document.getElementById("stage").value + "&role=" + document.getElementById("role").value + "&notes=" + document.getElementById("notes").value;

  request.open('POST', '/submit-no', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
  });

// DELETE FROM DO NOT MOVE FORWARD LIST
$(document).on("click", ".deleteReject", function() {
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    url: "/delete-no/" + selected.attr("data-id"),
    success: function(response) {
      selected.remove();
      // $("#firstName").val("");
      // $("#lastName").val("");
      // $("#university").val("");
      // $("#status").val("");
    }
  });
});

// ADD UNIVERSITY
$(document).on("click", "#addUniversity", function() {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/submit-school",
    data: {
      universityName: $("#universityName").val().trim(),
      created: Date.now()
    }
  })
  .done(function(data) {
    // $("#results").prepend("<p class='dataentry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
    //   data._id + ">" + data.universityName + " " +  "</span><span class=deleteSchool>Delete</span><span class=updateSchool>Edit</span></p>");
    console.log(data);
    $("#universityName").val("");
  });
});

// ADD PROGRAM
$(document).on("click", "#addProgram", function() {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/submit-program",
    data: {
      programName: $("#programName").val().trim(),
      created: Date.now()
    }
  })
  .done(function(data) {
    // $("#results").prepend("<p class='dataentry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
    //   data._id + ">" + data.universityName + " " +  "</span><span class=deleteSchool>Delete</span><span class=updateSchool>Edit</span></p>");
    console.log(data);
    $("#programName").val("");
  });
});

// ++++++++++
// FILTER RESULTS
// ++++++++++

// POTENTIAL HIRES

$(document).on("click", "#filtersSubmitButton", function() {
  
  var university = $("#filterUniversity").val();
  var role = $("#filterRole").val();
  var program = $("#filterProgram").val();
  var stage = $("#filterStage").val();

  $.ajax({
    type: "GET",
    url: "/filter?university=" + university + "&role=" + role + "&program=" + program + "&stage=" + stage ,
    success: function(data) {

      $("#results").empty();
  
      $("#results").prepend("<table class='highlight'><thead><tr><th>First Name</th><th>Last Name</th><th>University</th><th>Program</th><th>Role</th><th>Stage</th><th>E-Mail</th><th>Phone #</th><th>Notes</th><th>Actions</th></tr></thead><tbody id='resultsTable'>");

      for (var i = 0; i < data.length; i++){
        $("#resultsTable").prepend("<tr data-id=" + data[i]._id + "><td>" + data[i].firstName + "</td><td>" + data[i].lastName + "</td><td>" + data[i].university + "</td><td>" + data[i].program + "</td><td>" + data[i].role + "</td><td>" + data[i].stage + "</td><td>" + data[i].email + "</td><td>" + data[i].phone + "</td><td class= notesSection>" + data[i].notes + "</td><td class='deleter'>Delete</td><td class= 'updater modal-trigger' id='updatePotential' href='#modal1'>Update</td></tr>");
      }
  
    }
  });
});


// EXISTInG PIPELINE

$(document).on("click", "#filterExisting", function() {
  
  var university = $("#filterUniversity").val();
  var role = $("#filterRole").val();
  var program = $("#filterProgram").val();
  var stage = $("#filterStage").val();

  $.ajax({
    type: "GET",
    url: "/filter-existing?university=" + university + "&role=" + role + "&program=" + program + "&stage=" + stage ,
    success: function(data) {

      $("#results").empty();

      $("#results").prepend("<table class='highlight'><thead><tr><th>First Name</th><th>Last Name</th><th>University</th><th>Role</th><th>Program</th><th>E-Mail</th><th>Phone #</th><th>Notes</th><th>Actions</th></tr></thead><tbody id='resultsTable'>");

      for (var i = 0; i < data.length; i++){
        $("#resultsTable").prepend("<tr data-id=" + data[i]._id + "><td>" + data[i].firstName + "</td><td>" + data[i].lastName + "</td><td>" + data[i].university + "</td><td>" + data[i].role + "</td><td>" + data[i].program + "</td><td>" + data[i].email + "</td><td>" + data[i].phone + "</td><td>" + data[i].notes + "</td><td class='deleter'>Delete</td></tr>");
      }
  
    }
  });
});

$(document).on("click", "#filterRejects", function() {
  
  var university = $("#filterUniversity").val();
  var role = $("#filterRole").val();
  var program = $("#filterProgram").val();
  var stage = $("#filterStage").val();

  $.ajax({
    type: "GET",
    url: "/filter-no?university=" + university + "&role=" + role + "&program=" + program + "&stage=" + stage ,
    success: function(data) {

      $("#results").empty();
      
      $("#results").prepend("<table class='highlight'><thead><tr><th>First Name</th><th>Last Name</th><th>University</th><th>Role</th><th>Stage</th><th>E-Mail</th><th>Phone #</th><th>Actions</th></tr></thead><tbody id='resultsTable'>");

      for (var i = 0; i < data.length; i++){
        $("#resultsTable").prepend("<tr data-id=" + data[i]._id + "><td>" + data[i].firstName + "</td><td>" + data[i].lastName + "</td><td>" + data[i].university + "</td><td>" + data[i].role + "</td><td>" + data[i].stage + "</td><td>" + data[i].email + "</td><td>" + data[i].phone + "</td><td class='deleter'>Delete</td></tr>");
      }
  
    }
  });
});


// end document.ready
});

 