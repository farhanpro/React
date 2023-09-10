import React, { Component } from 'react'
import ClildComponent from './ClildComponent'

 class ParentComponent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         ParentName :'Parent'
      }
      this.greetParent = this.greetParent.bind(this)
    }
    greetParent(child){
        alert(`Hello ${this.state.ParentName} from ${child}`)
    }
  render() {
    return (
      <div>
        ParentComponent 
        <ClildComponent greetHandler ={this.greetParent}/>
      </div>
    )
  }
}

export default ParentComponent