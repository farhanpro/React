import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  Adder() {
    console.log(this.count);
    this.setState({ count: this.state.count + 1 });
  }

  Reducer() {
    console.log(this.count);
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <h1
          style={{
            color:
              this.state.count === 0
                ? "orange"
                : this.state.count > 0
                ? "green"
                : "red",
          }}
        >
          Count = {this.state.count}
        </h1>
        <button onClick={() => this.Adder()}>Click to Add</button>
        <button onClick={() => this.Reducer()}>Reduce</button>
      </div>
    );
  }
}

export default Counter;
