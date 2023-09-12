import React, { Component } from 'react'
import "../Css/Child.css"

export class ClildComponent extends Component {
  constructor(props) {
    super(props)  
    this.state = {
       data : this.props.dataParentToChild
    }
  }
  
  sendDataToParent = () =>{
    let modifieddata = this.state.data;
    modifieddata.EmployeeStatus = !modifieddata.EmployeeStatus ;
    
    this.setState({
      data: modifieddata
    });
    
    console.log("Child",this.state);
    this.props.parentCallback( modifieddata.EmployeeStatus );
  }

  render() {
    const { data} = this.state
    return (
      <div class="container mx-auto mt-4"> 
      <div class="row">
      <div class="col md-4">
      <div class='card' style={{width: "18rem"}}> 
      <img src={data.EmployeePhoto} class="card-img-top" alt="..."></img>
       <div class='card-body'>
        <h5 class="card-title">{`Name : ${data.EmployeeName}`}</h5>
        <h7 class="card-subtitle ">{`${data.EmployeeEmail}`}</h7>
        <p class="card-text">{`Employee Role : ${data.EmployeeRole}`}</p>
        <p class="card-text">{`Employee Status : ${data.EmployeeStatus}`}</p>
        <button onClick={this.sendDataToParent}>Click</button>
       </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
}

export default ClildComponent