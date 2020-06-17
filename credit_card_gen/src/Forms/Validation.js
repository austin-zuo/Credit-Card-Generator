import React from  'react';
import axios from 'axios';

export default class Validation extends React.Component {
    state = {
        num: "",
        isValid: null
    }

    // componentDidMount () {
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    //       .then(response => {
    //         this.setState({isValid: response.data})
    //       })
    //   }

    changeHandler = event => {
        this.setState({ num: event.target.value})
    }

    validateHandler = () => {
        console.log('validate handler called')
        let url = 'http://localhost:8080/rest/validator/' + this.state.num
        axios.get(url)
            .then(response => {
                this.setState({isValid: response.data})
            })
    }

    render() {
        return (
            <div>
                <h2>Enter Card No.</h2>
                <input onChange={this.changeHandler}></input>
                &nbsp;&nbsp;
                <button onClick={this.validateHandler}>Validate</button>
                <p>{this.state.isValid}</p>
            </div>
        )
    }
}