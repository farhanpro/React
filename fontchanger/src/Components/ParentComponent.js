import React, { Component } from 'react'
import ClildComponent from './ClildComponent'

 class ParentComponent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         EmployeeName :'Clark',
         EmployeePhoto : 'https://shorturl.at/nrGNR',
         EmployeeId : 0,
         EmployeeRole : 'Software Engineer',
         EmployeeStatus : true,
         EmployeeEmail : 'shaikhfarhan549@gmail.com'
      }
  
    }
    handleCallback = (childData) =>{
      this.setState({EmployeeStatus: childData});
      console.log('Parent',this.state);
  }
   
  render() {
    const data = this.state;
    return (
        <div> 
          <ClildComponent dataParentToChild = {data} parentCallback = {this.handleCallback}/>
        </div>
    )
  }
}

export default ParentComponent