import React, { Component } from 'react';
const axios = require('axios');


class FilterCandidates extends Component {
  render() {
    return (
      <div>
        <div className="showCandidatesDiv">
          <button onClick = { getAllCandidates } >Show All Prospects</button>
        </div>
        <div id="results"></div>
      </div>
    );
  }
}

export default FilterCandidates;

const getAllCandidates = () => {
  axios.get('/all')
  .then(function (response) {

    var data = response.data;
    var resultsSection = document.getElementById("results");

    resultsSection.innerHTML = "";

    var resultTitle = document.createElement("h4");
    var titleText = document.createTextNode("All Candidates");
    resultTitle.appendChild(titleText);
    resultsSection.appendChild(resultTitle);

    for (var i=0; i<data.length; i++){
      var candidate = document.createElement("p");

      var deleteOption = document.createElement("span");
      var deleteText = document.createTextNode("Delete");
      deleteOption.setAttribute("class", "deleteCandidate");
      deleteOption.appendChild(deleteText);

      var updateOption = document.createElement("span");
      var updateText = document.createTextNode("Update");
      updateOption.setAttribute("class", "updateCandidate");
      updateOption.appendChild(updateText);

      var candidateInfo = document.createTextNode(data[i].firstName + " " + data[i].lastName + " " + data[i].university + " " + data[i].status);
      
      candidate.setAttribute("data-id", data[i]._id);
      candidate.appendChild(candidateInfo);
      candidate.appendChild(deleteOption);
      candidate.appendChild(updateOption);

      resultsSection.appendChild(candidate);
      console.log(candidate);
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}


