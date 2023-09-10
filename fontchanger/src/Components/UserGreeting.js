import React, { Component } from 'react'

 class UserGreeting extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         isLoggedIn : true
      }
    }
  render() {
    if (this.state.isLoggedIn){
        return(
            <div>
                Welcome Viswas
            </div>
        )
    }
    else{
        return(
            <div>
                Welocme guest
            </div>
        )
    }
    return (
      <div>
        <div>Welcome Farhan</div>
        <div>Welcome Guest</div>
    </div>
    )
  }
}

export default UserGreeting