import React, { Component } from 'react';
import "../App.css";

export class ExpenseTracker extends Component {
  state = {
    expenses: [],
    shouldEditDiv: false,
    category:'',
    total: 0,
    newExpense: {
      id: 0,
      name: '',
      amount: Number,
      category: '',
    },
  };
  
  handleCategoryEdit(e)
  {
    e.target.value === "None"?this.fetchData():this.fetchByCategory(e.target.value)
  }
  componentDidMount(){
    this.fetchData();
  };

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
      shouldEditDiv: false,
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
  .then((data) => {
    const newTotal = data.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    this.setState({ expenses: data, total: newTotal });
  })
  .catch((err) => console.log('Error fetching data: ' + err));

  };
  
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
  };

  updateEmployee = (id)=>{

    fetch(`http://localhost:3002/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the data for the single employee here
      this.setState({ newExpense : data});
        console.log(data);
        

      })
      .catch((error) => console.error('Error fetching employee:', error));
  };

  editEmployee = (data) => {
    fetch(`http://localhost:3002/posts/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Item updated successfully:', data);
        this.setState({
          newExpense: {
            name: '',
            category: '',
            amount: '',
          },
          shouldEditDiv: false
        });
      
        this.fetchData();
        // You can add code here to handle the response as needed
      })
      .catch((error) => console.error('Error updating item:', error));
  };

  deleteItem = (id) => {
    fetch(`http://localhost:3002/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        this.fetchData();
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  fetchByCategory = (category) =>{
  fetch(`http://localhost:3002/posts?category=${category}`)
  .then((res) => res.json())
  .then((data) => {
    const newTotal = data.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    this.setState({ expenses: data, total: newTotal });
  })
  .catch((err) => console.log('Error fetching data: ' + err));
  } 

  render() {
    const { expenses, newExpense, total } = this.state;

    return (
      <div style={{margin:"2%"}}>
        <h1 class="heading">Expense Tracker</h1>
        <form  class="flex-container" onSubmit={this.handleSubmit}>

          <div>
          <label> Name : </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newExpense.name}
            onChange={this.handleChange}
          />
          </div>

          <div>
          <label> Category : </label> 
          <select name = "category" onChange={this.handleChange} >
          <option >Select</option>
          {/* s food, education, entertainment, bills, and travel */}
            <option name = "category" value="Food" >Food</option>
            <option name = "category" value="Education" >Education</option>
            <option name = "category" value="Entertainment" >Entertainment</option>
            <option name = "category" value="Bills" >Bills</option>
            <option name = "category" value="Travel" >Travel</option>
          </select>
          </div>

          <div>
          <label> Amount : </label>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={this.handleChange}
          />
          </div>
          
          <button class="btn btn-primary" type="submit" onClick={()=>{this.addExpense()}}>Save</button>
        </form>
        
        <br />

      
        
        {/* <select name = "category" onChange={(e)=>{this.fetchByCategory(e.target.value)}} > */}
        <label> Apply Filter  </label> 
        <select name = "category" onChange={(e)=>{this.handleCategoryEdit(e)}} >
            <option   name = "category" value = "None">None</option>
            <option name = "category" value="Food" >Food</option>
            <option name = "category" value="Education" >Education</option>
            <option name = "category" value="Entertainment" >Entertainment</option>
            <option name = "category" value="Bills" >Bills</option>
            <option name = "category" value="Travel" >Travel</option>
          </select>

          <table className="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Category</th>
      <th>Amount</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {expenses.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.name}</td>
        <td>{expense.category}</td>
        <td>{expense.amount}</td>
        <td>
          <button
            style={{ margin: 3 }}
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              this.updateEmployee(expense.id);
              this.setState({ shouldEditDiv: true });
            }}
          >
            Edit
          </button>
          <button
            style={{ margin: 3 }}
            className="btn btn-danger"
            type="button"
            onClick={() => {
              this.deleteItem(expense.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}

    {this.state.shouldEditDiv && (
      <tr>
        <td>
          <label>Name </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newExpense.name}
            onChange={this.handleChange}
          />
        </td>

        <td>
          <label>Category </label>
          <select
            name="category"
            value={newExpense.category}
            onChange={this.handleChange}
          >
            <option value="Food">Food</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Travel">Travel</option>
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

        <td>
          <button
            style={{ margin: 3 }}
            className="btn btn-secondary"
            type="button"
            onClick={() => {
              this.editEmployee(newExpense);
            }}
          >
            Save
          </button>
          <button
            style={{ margin: 3 }}
            className="btn btn-danger"
            type="button"
            onClick={() => {
              this.setState({ shouldEditDiv: false });
            }}
          >
            Cancel
          </button>
        </td>
      </tr>
    )}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan="2"></td>
      <th style={{ backgroundColor:"#f2f2f2" }}>
        <h4 style={{ textAlign: "left" }}>Total: {total}</h4>
      </th>
      <td></td>
    </tr>
  </tfoot>
</table>

        {/* <h4>Total: {total}</h4> Display the total expense */}
      </div>
    );
  }
}

export default ExpenseTracker;