import React, { Component } from 'react'

 class EventBind extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       message : 'Hello'
    }
    //this.ChangeMsg = this.ChangeMsg.bind(this);
  }
  //  ChangeMsg(){
  //   this.setState({
  //     message:'Good Bye'
  //   })
  // } 
    ChangeMsg = ()=>{
      this.setState({
        message :'Good Bye'
      })
    }
  
  render() {
    return (
      <div>
        <div>{this.state.message}</div>
        {/* <button onClick={this.ChangeMsg.bind(this)}>Click</button> */}
        <button onClick={this.ChangeMsg}>Click</button>
      </div>
    )
  }
}

export default EventBind