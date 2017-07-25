import React, { Component } from 'react';
const axios = require('axios');


class AddCandidates extends Component {
  constructor(props) {
    super(props);

    this.state = 
    {
      firstName: '',
      lastName: '',
      university: '',
      status: '',
    };

    // console.log(this.state);

    this.addFirstName = this.addFirstName.bind(this);
    this.addLastName = this.addLastName.bind(this);
    this.addUniversity = this.addUniversity.bind(this);
    this.addStatus = this.addStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addFirstName(event) {
    this.setState({firstName: event.target.value});
  }

  addLastName(event) {
    this.setState({lastName: event.target.value});
  }

  addUniversity(event) {
    this.setState({university: event.target.value});
  }

  addStatus(event) {
    this.setState({status: event.target.value});
  }

  handleSubmit(event) {
    alert('Candidate Added: ' + this.state.firstName + " " + this.state.lastName);
    event.preventDefault();
    axios.post('/submit', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      university: this.state.University,
      status: this.state.status
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input type="text" value={this.firstName} onChange={this.addFirstName} />
        </label>
        <label>
          Last Name:
          <input type="text" value={this.lastName} onChange={this.addLastName} />
          { console.log(this.state) }
        </label>
        <label>
          University:
          <select value={this.university} onChange={this.addUniversity}>
            <option>Berkeley</option>
            <option>Rutgers</option>
            <option>Texas</option>
          </select>
        </label>
        <label>
          Status:
          <select value={this.status} onChange={this.addStatus}>
            <option>Pending HR</option>
            <option>Pending Tech</option>
            <option>Pending Final</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AddCandidates;



  


