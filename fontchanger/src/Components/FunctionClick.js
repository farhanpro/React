import React from 'react'

function FunctionClick() {
    function clickHandler(){
            console.log("Button Clicked");
    }
  return (
    <div>FunctionClick
    <button onClick={clickHandler}>Clicked</button>
    </div>
  )
}

export default FunctionClick