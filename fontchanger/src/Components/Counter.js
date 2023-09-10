import React, { Component } from 'react'

 class Counter extends Component {
    constructor(props){
        super(props)
        this.state ={
            count:0
        }
        
    }
    adder(){
      this.setState ({count : this.state.count = this.state.count +1})        
    }
  render() {
    return (
        <div>
            <h1>Counter = {this.state.count}</h1>
            <button onClick={()=> this.adder()}> Add</button>
            <button>Substract</button>
        </div>
      
    )
  }
}

export default Counter