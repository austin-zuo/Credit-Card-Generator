import React, { Component } from 'react';
import './App.css';
import Card from './Card/Card.js';

class App extends Component {

  state = {
    card_list: [],
    show: [],
    bin: ''
  }

  //Updates the bin in this.state as userInput
  //input: event, output: none
  updateBinHandler = (event) => {
    this.setState({
      bin: event.target.value
    })
    console.log(this.state.bin)
  }

  //Generates userInput amount of cards in this.state
  //input: event, output: none
  cardHandler = (event) => {
    //Function that generates random credit card number that start with Bin
    //input: None
    //output: str->random CCN
    const genCardNumber = () => {
      let rv = this.state.bin
      let num = 16 - rv.length
      for (let i = 0; i < num; i++) {
        rv += Math.floor(Math.random() * 10).toString()
      }
      return rv
    }
    let arr = []
    let showarr = []
    let num = parseInt(event.target.value, 10);
    for (let i = 0; i < num; i++) {
        arr.push(genCardNumber())
        showarr.push(false)
    }
    this.setState({
      card_list: arr,
      show: false
    })
    

  }

  //Changes this.state.show[index] to true
  //input: index, output: none
  showVerifyHandler = (index) => {
    var tmp = [...this.state.show]
    tmp[index] = true
    this.setState({
      show: tmp
    })
  }

  verify = (num) => {
    return (Math.random() > 0.5).toString();
  }

  render() {
    const card_arr = this.state.card_list.map((num, index) => {
      return (<div>
        <Card key={index} num={num} showVerify={this.showVerifyHandler.bind(this, index)}></Card>
        {this.state.show[index] ?
        <p>{this.verify(num)}</p> : null}
        </div>)
    })



    return (
      <div className="App">
        <h1>Fake Credit Card Generator</h1>
        <h2>Now Enter 1-5 Digit Bin Number</h2>
        <input onChange={this.updateBinHandler}></input>
        <h2>Now Enter Number of Cards to Generate</h2>
        <input onChange={this.cardHandler}></input>
        {card_arr}
      </div>
    );
  }
}

export default App;
