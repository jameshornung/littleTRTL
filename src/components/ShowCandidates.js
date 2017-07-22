import React, { Component } from 'react';
const axios = require('axios');


class ShowCandidates extends Component {
  render() {
    return (
      <div className="showCandidatesDiv">
        <button onClick = { getAllCandidates } >Show All Prospects</button>
      </div>
    );
  }
}

export default ShowCandidates;

const getAllCandidates = () => {
  axios.get('/all').then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}



// var request = new XMLHttpRequest();

// const showFolks = () => {
//   // alert("I work");
//   request.open('GET', 'all', true);

//   request.onload = function() {
//     if (request.status >= 200 && request.status < 400) {

//       // var resultTitle = document.createElement("h4");
//       // var titleText = document.createTextNode("All Candidates");
//       // resultTitle.appendChild(titleText);
//       // resultsSection.appendChild(resultTitle);

//       var data = JSON.parse(request.responseText);
      
//       for (var i = 0; i < data.length; i++) {

//         var candidate = document.createElement("p");

//         var deleteOption = document.createElement("span");
//         var deleteText = document.createTextNode("Delete");
//         deleteOption.setAttribute("class", "deleteCandidate");
//         deleteOption.appendChild(deleteText);

//         var updateOption = document.createElement("span");
//         var updateText = document.createTextNode("Update");
//         updateOption.setAttribute("class", "updateCandidate");
//         updateOption.appendChild(updateText);

//         var candidateInfo = document.createTextNode(data[i].firstName + " " + data[i].lastName + " " + data[i].university + " " + data[i].status);
        
//         candidate.setAttribute("data-id", data[i]._id);
//         candidate.appendChild(candidateInfo);
//         candidate.appendChild(deleteOption);
//         candidate.appendChild(updateOption);

//         // resultsSection.appendChild(candidate);
//         console.log(candidate);
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
// }
