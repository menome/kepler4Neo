import React from "react";

function DisplaySlider(props){
    
    function setDisplayDB(){
        props.changeDisplay("db");
    }

    function setDisplayQuery(){
        props.changeDisplay("query");
    }

    return(
        <div className="displaySlider">
            <button type="button" onClick={setDisplayDB}>Connect to database</button>
            <button type="button" onClick={setDisplayQuery}>Perform query</button>
        </div>
    )
}

export default DisplaySlider;