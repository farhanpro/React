import React, { Component } from "react";

export class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input1: 0,
      input2: 0,
      output: 0,
    };
  }
  addItem = (a,b) => {
    
    this.setState({
      output: parseInt(a) + parseInt(b),
    });
  };
  SubItem = () => {
    const { input1, input2 } = this.state;
    this.setState({
      output: parseInt(input1) - parseInt(input2),
    });
  };
  Multiply = () => {
    const { input1, input2 } = this.state;
    this.setState({
      output: parseInt(input1) * parseInt(input2),
    });
  };
  Divide = () => {
    const { input1, input2 } = this.state;
    if (input1 == 0 || input2 == 0) {
      this.setState({
        output: "Cannot be divided by zero",
      });
    } else {
      this.setState({
        output: parseInt(input1) / parseInt(input2),
      });
    }
  };
  render() {
    return (
      <div>
       
        <table class="table">
          <thead>
            <tr>
              <th> Input 1</th>
              <th> Input 2 </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th > <input  type='number' placeholder='Enter input 1' value={this.input1} onChange={(e)=> this.setState({input1:e.target.value})}/> </th>
              <th> <input  type='number' placeholder='Enter input 2' value={this.input2} onChange={(e)=> this.setState({input2:e.target.value})}/> </th>
            </tr>
            <tr>
                <th><button type="button" class="btn btn-secondary" onClick={()=>{this.addItem(this.state.input1,this.state.input2)}}>Add</button></th>
                <th><button type="button" class="btn btn-secondary"  onClick={this.SubItem}>Substract</button></th>
            </tr>
            <tr>
                <th><button type="button" class="btn btn-secondary" onClick={this.Multiply}>Multiply</button></th>
                <th><button type="button" class="btn btn-secondary" onClick={this.Divide}>Divide</button></th>
            </tr>
            </tbody>
        </table>
        <h1>Total :  {this.state.output}</h1>
    
      </div>
    );
  }
}

export default Calculator;
