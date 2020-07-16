import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Validation from './Components/Validation.js'
import Generation from './Components/Generation.js'
import visalogo from './visalogo.jpg'
import Homepage from './Components/Homepage';
class App extends Component {

  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={visalogo} className="App-logo"/>
        </header>
        <Homepage></Homepage>
        
      </div>
    );
  }
}

export default App;
