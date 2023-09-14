import React, { Component } from 'react';

class App extends Component {

  state = {
    posts: [],
    newPost: {
      id:0,
      employeeName: '',
      employeeContact: '',
      employeeEmail: '',
      employeeStatus: '',
      shouldShowDiv: false,
      shouldEditDiv: false
    },
    editingItemId : null
  };

  componentDidMount() {
    // Fetch initial data from JSON Server
    this.fetchData();
  }

  fetchData() {
    fetch('http://localhost:3001/posts')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ posts: data });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      newPost: {
        ...prevState.newPost,
        [name]: value,
      },
    }));
  };
  handleClick = () => {
    this.setState((prevState) => ({
      shouldShowDiv: !prevState.shouldShowDiv,
    }));
  };

  addEmployee = () => {
    
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newPost),
    })
      .then(() => {
        this.fetchData(); // Refresh the data after adding
        this.setState({
          newPost: {
            employeeName: '',
            employeeContact: '',
            employeeEmail: '',
            employeeStatus: '',
            shouldShowDiv:false
            
          },
        });
      })
      .catch((error) => console.error('Error adding post:', error));
  };
 
  deleteItem = (id) => {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        this.fetchData();
      })
      .catch((error) => console.error('Error deleting item:', error));
  };
  
  updateItem = (id)=>{

  }
 

  render() {
    const { posts, newPost } = this.state;

    return (
      <div>
          <h2>Employee Manaement System</h2>
          <button class="btn btn-primary" onClick={this.handleClick}>Add</button>
          <table  class="table">
            
            <thead>
              <tr>
                <th scope="col">Employee Name</th>
                <th scope="col">Employee Contact</th>
                <th scope="col">Employee Email</th>
                <th scope="col">Employee Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            {/* To Show data here  */}
            {posts.map((post) => (
              <tbody>
                <tr key={post.id} >
               <td > <p>{post.employeeName}</p></td>
               <td ><p>{post.employeeContact}</p></td>
               <td ><p>{post.employeeEmail}</p></td>
               <td ><p>{post.employeeStatus}</p></td>
               <td >
                <button  class="btn btn-danger" onClick={()=>{this.deleteItem(post.id)}} >Delete</button> 
                <button onClick={()=>{this.editEmployee(post.id)}} class="btn btn-secondary">Edit</button> 
                <button class="btn btn-primary" onClick={()=>{ this.handleClick()}}>Add</button></td>
              </tr>
             
              </tbody>
               
            ))}
             {this.state.shouldShowDiv && 
             
             <tr>
         <td >Employee Name : <input type="text"name="employeeName"placeholder="Employee Name"value={newPost.employeeName} onChange={this.handleInputChange}/></td>
         <td >employeeContact : <input type="text"name="employeeContact"placeholder="employeeContact"value={newPost.employeeContact}onChange={this.handleInputChange}/></td>
         <td >employeeEmail : <input type="text" name="employeeEmail" placeholder="employeeEmail" value={newPost.employeeEmail} onChange={this.handleInputChange}/></td>
         <td >employeeStatus : <input type="text" name="employeeStatus" placeholder="employeeStatus" value={newPost.employeeStatus} onChange={this.handleInputChange}/></td>
         <td >
          <button class="btn btn-primary" onClick={()=>{this.addEmployee(); this.handleClick();}} > Add</button> 
          <button class="btn btn-danger" onClick={()=>{ this.handleClick();}} > cancel</button></td>
         </tr>
        
         }
         {this.state.shouldEditDiv && <tr  key={posts.id}>

          <td >Employee Name : <input type="text"name="employeeName"placeholder="Employee Name"value={newPost.employeeName} onChange={this.handleInputChange}/></td>
         <td >employeeContact : <input type="text"name="employeeContact"placeholder="employeeContact"value={newPost.employeeContact}onChange={this.handleInputChange}/></td>
         <td >employeeEmail : <input type="text" name="employeeEmail" placeholder="employeeEmail" value={newPost.employeeEmail} onChange={this.handleInputChange}/></td>
         <td >employeeStatus : <input type="text" name="employeeStatus" placeholder="employeeStatus" value={newPost.employeeStatus} onChange={this.handleInputChange}/></td>
          </tr>
        
        }
            </table>

           
        </div>
    );
  }
}

export default App;
