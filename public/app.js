//++++++++++++++++++++
// GLOBAL VARIABLES
//++++++++++++++++++++

var resultsSection = document.getElementById("results");
var request = new XMLHttpRequest();

//++++++++++++++++++++
// MATERIALIZE FUNTIONALITY
//++++++++++++++++++++

 $('select').material_select();

// ++++++++++++++++++++
// CLICK EVENTS
// ++++++++++++++++++++

// All Candidates - jQuery removed

// document.getElementById("generateUniversities").addEventListener("click", function(){

//   request.open('GET', 'all-schools', true);

//   request.onload = function() {
//     if (request.status >= 200 && request.status < 400) {

//       var data = JSON.parse(request.responseText);

//       var disabledOption = document.createElement("option");
//       disabledOption.setAttribute("class", "universityDropdown");
//       disabledOption.setAttribute("value", "");

//       var disabledOptionText = document.createTextNode("Select University")

//       disabledOption.appendChild(disabledOptionText);
//       document.getElementById("university").appendChild(disabledOption);
      
//       for (var i = 0; i < data.length; i++) {

//         var universityOption = document.createElement("option");
//         console.log(universityOption);

//         universityOption.setAttribute("data-id", data[i]._id);
//         universityOption.setAttribute("class", "universityDropdown");
        
//         var universityNameText = document.createTextNode(data[i].universityName);
//         universityOption.appendChild(universityNameText);

//         document.getElementById("university").appendChild(universityOption);
//         $('select').material_select();
//       }
//     } 
//     else {
//       console.log("server error")
//     }
//   };

//   request.onerror = function() {
//     // There was a connection error of some sort
//   };

//   request.send();
// });

// Click Generate Universities button (update selector)
document.getElementById("allProspects").addEventListener("click", function(){

  resultsSection.innerHTML = "";

  request.open('GET', 'all', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {

      var resultTitle = document.createElement("h4");
      var titleText = document.createTextNode("All Candidates");
      resultTitle.appendChild(titleText);
      resultsSection.appendChild(resultTitle);

      var data = JSON.parse(request.responseText);
      
      for (var i = 0; i < data.length; i++) {

        var candidate = document.createElement("p");

        var deleteOption = document.createElement("span");
        var deleteText = document.createTextNode("Delete");
        deleteOption.setAttribute("class", "deleteCandidate");
        deleteOption.appendChild(deleteText);

        var updateOption = document.createElement("span");
        var updateText = document.createTextNode("Update");
        updateOption.setAttribute("class", "updateCandidate");
        updateOption.appendChild(updateText);

        var candidateInfo = document.createTextNode(data[i].firstName + " " + data[i].lastName + " " + data[i].university + " " + data[i].program + " " + data[i].role + " " + data[i].email + data[i].phone);
        
        candidate.setAttribute("data-id", data[i]._id);
        candidate.appendChild(candidateInfo);
        candidate.appendChild(deleteOption);
        candidate.appendChild(updateOption);

        resultsSection.appendChild(candidate);
      }
    } 
    else {
      console.log("server error")
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
});

//Click add-prospect button (submit entry form)
document.getElementById("addProspect").addEventListener("click", function(){

  var data = "firstName=" + document.getElementById("firstName").value + "&lastName=" + document.getElementById("lastName").value + "&university=" + document.getElementById("university").value + "&program=" + document.getElementById("program").value + "&role=" + document.getElementById("role").value + "&email=" + document.getElementById("email").value + "&phone=" + document.getElementById("phone").value;

  // var data = "firstName=" + document.getElementById("firstName").value + "&lastName=" + document.getElementById("lastName").value + "&university=" + document.getElementById("university").value + "&program=" + document.getElementById("program").value + "&role=" + document.getElementById("role").value + "&email=" + document.getElementById("email").value + "&phone=" + document.getElementById("phone").value;

  request.open('POST', '/submit', true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send(data);
  console.log("data = ", data);
  })

// Click "Delete" (delete a prospect)
$(document).on("click", ".deleteCandidate", function() {
  // Save the p tag that encloses the button
  var selected = $(this).parent();
  // Make an AJAX GET request to delete the specific prospect
  // this uses the data-id of the p-tag, which is linked to the specific prospect
  $.ajax({
    type: "GET",
    url: "/delete/" + selected.attr("data-id"),

    // On successful call
    success: function(response) {
      // Remove the p-tag from the DOM
      selected.remove();
      // Clear the propsect info
      $("#firstName").val("");
      $("#lastName").val("");
      $("#university").val("");
      $("#status").val("");
    }
  });
});

// Click "Edit" (update a prospect)
$(document).on("click", ".updateCandidate", function() {
  // Save the p tag that encloses the button
  var selected = $(this).parent();
  // console.log("selected = ", selected)
  // Make an ajax call to find the prospect
  // This uses the data-id of the p-tag, which is linked to the specific prospect
  $.ajax({
    type: "GET",
    url: "/find-one/" + selected.attr("data-id"),
    success: function(data) {
      // Fill the inputs on the update form with the data that the ajax call collected
      $("#updateFirstName").val(data.firstName);
      $("#updateLastName").val(data.lastName);
      $("#updateUniversity").val(data.university);
      $("#updateStatus").val(data.status);
      // Add a submit button to the form
      $("#updateButtonHolder").html("<button class='submitButton updateProspect' data-id='" + data._id + "'>Submit</button>");
    }
  });
});

// Click "Update" button (submit update form)
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
      status: $("#updateStatus").val()
    },
    // On successful call
    success: function(data) {
      // Clear the inputs
      $("#updateFirstName").val("");
      $("#updateLastName").val("");
      $("updateUniversity").val("");
      $("updateStatus").val("");

      //remove the update button
      $("#updateButtonHolder").empty();

      //empty the results div
      $("#results").empty();
    }
  });
});


$(document).on("click", "#filtersSubmitButton", function() {
  
  var university = $("#filterUniversity").val();
  var status = $("#filterStatus").val();

  $.ajax({
    type: "GET",
    url: "/filter?university=" + university + "&status=" + status,
    success: function(data) {

      $("#results").empty();
      for (var i = 0; i < data.length; i++) {
      $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
      data[i]._id + ">" + data[i].firstName + " " + data[i].lastName + " " + data[i].university + " " + data[i].status + " " + "</span><span class=deleter>Delete</span><span class=update>Edit</span></p>");
    }
  
    }
  });
});


// UNIVERSITY FUNCTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Working
$(document).on("click", "#allSchools", function(){
  $("#results").empty();

  $.getJSON("/all-schools", function(data) {

    for (var i = 0; i < data.length; i++) {
      $("#results").prepend("<p class='dataentry' data-id=" + data[i]._id + "><span class='dataTitle' data-id=" +
      data[i]._id + ">" + data[i].universityName + " " + data[i].campusLocation + " " + "</span><span class=deleteSchool>Delete</span><span class=updateSchool>Edit</span></p>");
    }
  })
});

// Working
$(document).on("click", "#addUniversity", function() {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/submit-school",
    data: {
      universityName: $("#universityName").val(),
      campusLocation: $("#campusLocation").val(),
      created: Date.now()
    }
  })
  .done(function(data) {
    
    $("#results").prepend("<p class='dataentry' data-id=" + data._id + "><span class='dataTitle' data-id=" +
      data._id + ">" + data.universityName + " " + data.campusLocation + " " +  "</span><span class=deleteSchool>Delete</span><span class=updateSchool>Edit</span></p>");

    $("#universityName").val("");
    $("#campusLocation").val("");
  });
});

// Click "Delete" (delete a university)
$(document).on("click", ".deleteSchool", function() {
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    url: "/delete-school/" + selected.attr("data-id"),

    success: function(response) {
      // Remove the p-tag from the DOM
      selected.remove();
      $("#schoolName").val("");
      $("#campusLocation").val("");
    }
  });
});

// Click "Edit" (update a school)
$(document).on("click", ".updateSchool", function() {
  
  var selected = $(this).parent();
  $.ajax({
    type: "GET",
    url: "/find-one-school/" + selected.attr("data-id"),
    success: function(data) {
      console.log(data);
      $("#updateUniversityName").val(data.universityName);
      $("#updateCampusLocation").val(data.campusLocation);
      // Add a submit button to the form
      $("#schoolUpdateButtonHolder").html("<button class='submitButton updateSchoolButton' data-id='" + data._id + "'>Submit</button>");
    }
  });
});

// Click "Update" button (submit update form)
$(document).on("click", ".updateSchoolButton", function() {
  // Save the selected element
  var selected = $(this);
  // console.log("this ", this);
  $.ajax({
    type: "POST",
    url: "/update-school/" + selected.attr("data-id"),
    dataType: "json",
    data: {
      universityName: $("#updateUniversityName").val(),
      campusLocation: $("#updateCampusLocation").val()
    },
    // On successful call
    success: function(data) {
      // Clear the inputs
      $("#updateUniversityName").val("");
      $("#updateCampusLocation").val("");

      //remove the update button
      $("#schooUpdateButtonHolder").empty();

      //empty the results div
      $("#results").empty();
    }
  });
});

