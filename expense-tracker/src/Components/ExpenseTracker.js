import React, { Component } from 'react';

export class ExpenseTracker extends Component {
  state = {
    expenses: [],
    newExpense: {
      id: 0,
      name: '',
      amount: 0,
      category: '',
      shouldEditDiv: false
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
        category: '',
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
                category: '',
            },
        });
    })
    .catch((error)=> console.log('Error adding post',error));
  }

  updateEmployee(id) {
    
    fetch(`http://localhost:3002/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the data for the single employee here
      this.setState({ newExpense: data });
        console.log(data);

      })
      .catch((error) => console.error('Error fetching employee:', error));
  };

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
          <label>Category </label>
           
          <select name = "category" onChange={this.handleChange} >
          <option >Select</option>
          {/* s food, education, entertainment, bills, and travel */}
            <option name = "category" value="Food" >Food</option>
            <option name = "category" value="Education" >Education</option>
            <option name = "category" value="Entertainment" >Entertainment</option>
            <option name = "category" value="Bills" >Bills</option>
            <option name = "category" value="Travel" >Travel</option>
          </select>
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
            <th>Category</th>
            <th>Amount</th>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td> 
                  <button style={{margin:3}} class="btn btn-secondary" type="button" onClick={()=>{this.setState({shouldEditDiv:true});this.updateEmployee(expense.id)}}>Edit</button>
                  <button style={{margin:3}} class="btn btn-danger" type="button" >Delete</button>
                </td>
              </tr>
            ))}
             {newExpense.shouldEditDiv && 
              <tr>
                <td> 
                  <label>Name </label>
                  <input type="text" name="name" placeholder="Name" value={newExpense.name} onChange={this.handleChange}/>
                </td>
              
              <td>
                <label>Category </label>
                <select name = "category" onChange={this.handleChange} >
                <option >Select</option>
                {/* s food, education, entertainment, bills, and travel */}
                  <option name = "category" value="Food" >Food</option>
                  <option name = "category" value="Education" >Education</option>
                  <option name = "category" value="Entertainment" >Entertainment</option>
                  <option name = "category" value="Bills" >Bills</option>
                  <option name = "category" value="Travel" >Travel</option>
                </select>
              </td>
              
              <td>
                <label>Amount </label>
                    <input
                      type="text"
                      name="amount"
                      placeholder="Amount"
                      value={newExpense.amount}
                      onChange={this.handleChange}
                    />
              </td>
               
              </tr>
            }

          </tbody>
        </table>
        <h4>Total: {total}</h4> {/* Display the total expense */}
      </div>
    );
  }
}

export default ExpenseTracker;
