import React from  'react';
import axios from 'axios';
import Card from './Card.js';
import { Container, Button, Alert } from 'reactstrap';

export default class Validation extends React.Component {
    state = {
        card_list: [],
        bin: '',
        amount: null,
        showAlert: false,
        alertMessage: null,
        showAlert2: false,
        disabledBin: false,
        disabledLabel: false,
        select: ''
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
        if (event.target.value === '') {
        this.setState({
            showAlert2: false,
            amount: null
        })
        } else if (!Math.floor(Number(event.target.value)) || event.target.value < 0) {
        this.setState({
            showAlert2: true
        })} else {
        this.setState({
            amount: event.target.value,
            showAlert2: false
        })
        }
    }
    
    //Updates this.state.bin as user input.
    updateBinHandler = (event) => {
        if (event.target.value === '') {
            this.setState({
            showAlert: false,
            bin: ''
            })
        } else if (!Math.floor(Number(event.target.value)) ) {
            this.setState({
            showAlert: true,
            alertMessage: 'Not a valid number!'
            })
        } else if (event.target.value.length > 6) {
            this.setState({
            showAlert: true,
            alertMessage: 'Too long'
            })
        } else if (event.target.value[0] !== '3' && event.target.value[0] !== '4' && event.target.value[0] !== '5' && event.target.value[0] !== '6') {
            this.setState({
            showAlert: true,
            alertMessage: 'Invalid bin number for Visa, American Express, Mastercard, and Discover'
            })
        } else {
            this.setState({
            bin: event.target.value
            })
        }
    }

    //Updates this.state.bin to the value selected from the bin dropdown.
    updateBinHandler2 = (event) => {
        if (event.target.value === 'Visa' || event.target.value === 'Mastercard' || event.target.value === 'Discover' || event.target.value === 'American Express') {
            let bin = event.target.value
            this.setState({
            bin: bin,
            select: event.target.value
            })
        }
    }

    //Disables bin dropdown when bin input box is clicked.
    binClickHandler = () => {
        this.setState({
            disabledBin: false,
            disabledLabel: true
        })
      }

    //Disables bin input box when bin dropdown is clicked.
    labelClickHandler = () => {
        this.setState({
            disabledLabel: false,
            disabledBin: true
        })
    }

    //Undisables everything.
    resetHandler = () => {
        this.setState({
            disabledBin: false,
            disabledLabel: false,
            select: '',
            card_list: []
        })
    }
    

    render() {
        const card_arr = this.state.card_list.map((num, index) => {
            return (<Card key={index} num={num}></Card>)
          })

        return (
            <div>
                <h1 style={{margin:25}}>Fake Credit Card Generator</h1>
                <h3 style={{margin:15}}>Enter 1-6 Digit Bin Number</h3>
                <input type='text' onChange={this.updateBinHandler} disabled={this.state.disabledBin} onClick={this.binClickHandler}></input>
                {(this.state.showAlert) ? <Alert color="danger">{this.state.alertMessage}</Alert> : null}
                <form>
                    <label>
                    <h3 style={{margin:15}}>Or Choose From Dropdown</h3>
                    <select value={this.state.select} onChange={this.updateBinHandler2} disabled={this.state.disabledLabel} onClick={this.labelClickHandler}>
                        <option value=''>Select</option>
                        <option value='Visa'>Visa</option>
                        <option value='Mastercard'>Mastercard</option>
                        <option value='Discover'>Discover</option>
                        <option value='American Express'>American Express</option>
                    </select>
                    &nbsp;&nbsp;
                    </label>
                </form>

                <button onClick={this.resetHandler}>Reset</button>

                <h3 style={{margin:15}}>Enter Number of Cards to Generate</h3>
                <input type='text' value={this.state.amount} onChange={this.updateAmountHandler}></input>
                &nbsp;&nbsp;
                <button onClick={this.cardHandler}>Generate</button>
                {(this.state.showAlert2) ? <Alert color="danger">Invalid Number</Alert> : null}
                {card_arr}
            </div>
        )
    }
}