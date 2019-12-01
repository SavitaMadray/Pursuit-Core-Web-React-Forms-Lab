import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      numbers: "",
      operation: "SUM",
      calculate: "",
      submitted: false
    };
    this.state = this.initialState;
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.operation === "SUM") {
      this.calculateSum();
    } else if (this.state.operation === "AVERAGE") {
      this.calculateAvg();
    } else {
      this.calculateMode();
    }
  };

  calculateSum = () => {
    const arr = this.state.numbers.split(",");
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = parseInt(arr[i]);
    }
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    if (isNaN(sum)) {
      this.setState({
        calculate: "INVALID INPUT!!!!!!"
      });
    } else {
      this.setState({
        calculate: sum
      });
    }
  };

  calculateAvg = () => {
    let avg = 0;
    const arr = this.state.numbers.split(",");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = parseInt(arr[i]);
    }
    for (let i = 0; i < arr.length; i++) {
      avg += arr[i];
    }
    if (isNaN(avg)) {
      this.setState({
        calculate: "INVALID INPUT!!!!!!"
      });
    } else {
      avg = avg / arr.length;
      this.setState({
        calculate: avg
      });
    }
  };

  calculateMode = () => {
    const arr = this.state.numbers.split(",");
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      let num = parseInt(arr[i]);
      if(isNaN(num)){
        this.setState({
          calculate: "This is INVALID!!!!"
        })
        return;
      }
      if (obj[num] === undefined) {
        obj[num] = 1;
      } else {
        obj[num] = obj[num] + 1;
      }
    }
    let keys = Object.keys(obj);
    console.log(keys);
    
    let maxV = 0;
    let maxK = 0;
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      if (maxV < obj[k]) {
        maxV = obj[k];
        maxK = k;
      }
    }
    this.setState({
      calculate: maxK
    });
  };

  handleNumberChange = event => {
    this.setState({
      numbers: event.target.value
    });
  };

  handleSelectChange = event => {
    this.setState({ operation: event.target.value });
  };

  componentDidUpdate() {
    console.log(this.state);
  }
  render() {
    const { numbers, operation, calculate } = this.state;

    return (
      <div className="App">
        <h1>Enter Each Number in the array</h1>

        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            placeholder="enter numbers"
            value={numbers}
            onChange={this.handleNumberChange}
          />

          <select value={operation} onChange={this.handleSelectChange}>
            <option>SUM</option>
            <option>AVERAGE</option>
            <option>MODE</option>
          </select>
          <button>Calculate</button>
        </form>
        <p>{calculate}</p>
      </div>
    );
  }
}

export default App;
