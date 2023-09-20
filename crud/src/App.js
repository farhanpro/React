
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';




class App extends Component {

  state = {
    posts: [],
    tempPosts: [],
    show :false,
    newPost: {
      id:0,
      employeeName: '',
      employeeContact: '',
      employeeEmail: '',
      employeeStatus: 'Active',
      shouldShowDiv: false,
      shouldEditDiv: false
    },
    editingItemId : null
  };

  handleShow = ()=>{ this.setState({show: true}); }
  handleClose = ()=>{ this.setState({show: false}); }

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
  handleInputChange2 = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      newPost: {
       
        [name]: value,
      },
    }));
  };
 
  
  handleClick = () => {
    this.setState((prevState) => ({
      shouldShowDiv: !prevState.shouldShowDiv,
    }));
  };

  handleEditClick = () => {
    this.setState((prevState) => ({
      shouldEditDiv: !prevState.shouldEditDiv,
    }));
   this.fetchData();
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
 
  updateEmployee = (id) => {
    this.setState({
      
      shouldEditDiv:true
    });
    fetch(`http://localhost:3001/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the data for the single employee here
      this.setState({ newPost: data });
        console.log(data);

      })
      .catch((error) => console.error('Error fetching employee:', error));
  };
  
  editEmployee = (data) => {
    fetch(`http://localhost:3001/posts/${data.id}`, {
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
          newPost: {
            employeeName: '',
            employeeContact: '',
            employeeEmail: '',
            employeeStatus: '',
            shouldShowDiv:false
            
          },
        });
        // You can add code here to handle the response as needed
      })
      .catch((error) => console.error('Error updating item:', error));
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

 
  
  
 

  render() {
    const { posts, newPost } = this.state;

    return (
      
      <div>
          <h2 style={{ textAlign: "center", margin: "20px 0" }}>Employee Management System</h2>

          <Button variant="primary" onClick={this.handleShow}>Add an Employee</Button>

        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body >
          <table class = "table">
            <thead >
              <th scope="col">Employee Name </th>
              <th scope="col">Employee Contact </th>
            </thead>
            <tbody>
            <td><input type="text" name="employeeName" placeholder="Employee Name" value={newPost.employeeName} onChange={this.handleInputChange}/></td>
            <td><input type="text" name="employeeContact" placeholder="Employee Contact" value={newPost.employeeContact}onChange={this.handleInputChange}/></td>
            </tbody>
           <thead >
            <th scope="col">Employee Email </th>
            <th scope="col">Employee Status</th>
           </thead>
           <tbody>
            <td><input type="text" name="employeeEmail" placeholder="Employee Email" value={newPost.employeeEmail} onChange={this.handleInputChange}/></td>
            <td><select name = "employeeStatus"  onChange={this.handleInputChange}>
          <option >Select</option>
            <option name = "employeeStatus" value="Active" >Active</option>
            <option name = "employeeStatus" value="In-active" >In-active</option>
          </select></td>
           </tbody>

              

                
          </table>
         <br></br>
        
         
       
        
       
        
        
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>{this.handleClick();this.handleClose()}}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{this.addEmployee(); this.handleClose();}}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

         
          {/* <button class="btn btn-primary" onClick={this.handleClick}>Add</button> */}
          <hr></hr>
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
                <button style={{margin:3}} class="btn btn-danger" onClick={()=>{this.deleteItem(post.id)}} >Delete</button> 
                <button style={{margin:3}}class="btn btn-secondary" onClick={()=>{this.updateEmployee(post.id)}} >Edit</button> 
                {/* <button class="btn btn-primary" onClick={()=>{ this.handleClick()}}>Add</button> */}</td>
              </tr>
             
              </tbody>
               
            ))}
             
          {this.state.shouldEditDiv && 
             
             <tr>
         <td >Employee Name : <input type="text" name="employeeName" placeholder="Employee Name" value={newPost.employeeName} onChange={this.handleInputChange}/></td>
         <td >Employee Contact : <input type="text" name="employeeContact" placeholder="Employee Contact" value={newPost.employeeContact}onChange={this.handleInputChange}/></td>
         <td >Employee Email : <input type="text" name="employeeEmail" placeholder="Employee Email" value={newPost.employeeEmail} onChange={this.handleInputChange}/></td>
         {/* <td >Employee Status : <input type="text" name="employeeStatus" placeholder="Employee Status" value={newPost.employeeStatus} onChange={this.handleInputChange}/></td> */}
         <td><select name = "employeeStatus"  onChange={this.handleInputChange}>
          <option >Select</option>
            <option name = "employeeStatus" value="Active" >Active</option>
            <option name = "employeeStatus" value="In-active" >In-active</option>
          </select></td>
         <button style={{margin:10}} type="button" class="btn btn-primary" onClick={()=>{this.editEmployee(newPost); this.handleEditClick();}} > Edit</button> 
          <button type = "button" class="btn btn-danger" onClick={()=>{ this.handleEditClick();}} > Cancel</button>
         </tr>
        
         }
        
            </table>

           
        </div>
       
   );
  }

}
export default App;
