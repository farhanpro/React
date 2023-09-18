import React, { Component } from 'react';

export class ExpenseTracker extends Component {
  state = {
    expenses: [],
    newExpense: {
      id: 0,
      name: '',
      amount: 0,
    },
  };
  
  componentDidMount(){
    this.fetchData();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { expenses, newExpense } = this.state;

    // Calculate the new total by adding the amount of the new expense
    const newTotal = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0) + parseFloat(newExpense.amount);

    this.setState((prevState) => ({
      expenses: [...prevState.expenses, newExpense],
      newExpense: {
        id: prevState.newExpense.id + 1,
        name: '',
        amount: 0,
      },
    }));

    // Update the total in the state
    this.setState({ total: newTotal });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newExpense: {
        ...this.state.newExpense,
        [name]: value,
      },
    });
  };

  fetchData = ()=>{
    fetch('http://localhost:3002/posts')
    .then((res) => res.json())
    .then((data) => {this.setState({ expenses: data })
    })
    .catch((err) => console.log('Error fetching data: ' + err))
  }
  
  addExpense = () =>{
    fetch('http://localhost:3002/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newExpense),
    })
    .then(()=>{
        this.fetchData();
        this.setState({
            newExpense: {
                name: '',
                amount: 0,
            },
        });
    })
    .catch((error)=> console.log('Error adding post',error));
  }

  render() {
    const { expenses, newExpense, total } = this.state;

    return (
      <div>
        <h1>Expense Tracker</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Name </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newExpense.name}
            onChange={this.handleChange}
          />

          <br></br>
          <hr></hr>
          <label>Amount </label>
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={this.handleChange}
          />
          
          <br />
          <hr></hr>
          <button class="btn btn-primary" type="submit" onClick={()=>{this.addExpense()}}>Submit</button>
        </form>
        
        <br />
        <table class="table">
          <thead>
            <th>Name</th>
            <th>Amount</th>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h4>Total: {total}</h4> {/* Display the total expense */}
      </div>
    );
  }
}

export default ExpenseTracker;
