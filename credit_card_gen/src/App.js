import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Card from './Card/Card.js';
import Validation from './Forms/Validation.js'
class App extends Component {

  state = {
    card_list: [],
    bin: '',
    amount: null

  }

  //Updates the bin in this.state as userInput
  //input: event, output: none
  updateBinHandler = (event) => {
    this.setState({
      bin: event.target.value
    })
  }

  updateBinHandler2 = (event) => {
    if (event.target.value === 'Visa' || event.target.value === 'Mastercard' || event.target.value === 'Discover' || event.target.value === 'American Express') {
      let bin = event.target.value
      this.setState({
        bin: bin
      })
    }
  }

  //Generates userInput amount of cards in this.state
  //input: event, output: none
  cardHandler = () => {
    //Function that generates random credit card number that start with Bin
    //input: None
    //output: str->random CCN
    let url = 'http://localhost:8080/rest/generator/' + this.state.bin + '/' + this.state.amount
    axios.get(url)
        .then(response => {
            this.setState({
              card_list: response.data
            })
        })

    let arr = []
    let showarr = []
    let amount = this.state.amount
    for (let i = 0; i < amount; i++) {
        showarr.push(false)
    }
    this.setState({
      card_list: arr
    })
    

  }

  //Updates amount in this.state
  updateAmountHandler = (event) => {
    this.setState({
      amount: event.target.value
    })
  }



  verify = (num) => {
    return (Math.random() > 0.5).toString();
  }

  render() {
    const card_arr = this.state.card_list.map((num, index) => {
      return (<Card key={index} num={num}></Card>)
    })

    return (
      <div className="App">
        <h1>Fake Credit Card Generator</h1>
        <h2>Enter 1-6 Digit Bin Number or Choose From Dropdown</h2>
        <input onChange={this.updateBinHandler}></input>
        <form>
          <label>
            <h2>Or Pick From This Label</h2>
            <select value={this.state.value} onChange={this.updateBinHandler2}>
              <option value={null}>Select</option>
              <option value='Visa'>Visa</option>
              <option value='Mastercard'>Mastercard</option>
              <option value='Discover'>Discover</option>
              <option value='American Express'>American Express</option>
            </select>
          </label>
        </form>

        <h2>Enter Number of Cards to Generate</h2>
        <input onChange={this.updateAmountHandler}></input>
        &nbsp;&nbsp;
        <button onClick={this.cardHandler}>Generate</button>
        {card_arr}
        
        <Validation></Validation>
      </div>
    );
  }
}

export default App;
