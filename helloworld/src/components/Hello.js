import React from "react";

export const Hello = (props) => {
    
        return(
            <div>
                <h1>Hello {props.name} a.k.a {props.heroName} </h1>
                <h2>{props.htmlcontent}</h2>
                {props.childern}
            </div>
        ) 
    
}

