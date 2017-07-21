import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ShowCandidates from './components/ShowCandidates.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>littleTRTL</h2>
          <h4>I'm small, but growing</h4>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ShowCandidates />
      </div>
    );
  }
}

export default App;
