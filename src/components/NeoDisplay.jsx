import React, { useState } from "react";


//JSX Components
import NeoInput from "./NeoInput";
import DisplaySlider from "./DisplaySlider";
import DbUI from "./DbUI";

function NeoDisplay(props){

    // When display is db, show page with database connection status + login
    // When display is query, show page with inputs for query
    const [display, setDisplay] = useState("db");

    function createDisplay(){
        switch(display){
            case "db":
                return(
                    <DbUI />
                );
            case "query":
                return(
                    <NeoInput setUpload={props.setUpload} />
                );
            default:
                return(
                    <div>Error - could not display.</div>
                );
        }
    }

    function changeDisplay(param){
        setDisplay(param);
    }

    return(
        <div className="neoInputArea">
            <div><h2>kepler4Neo</h2></div>
            <DisplaySlider display={display} changeDisplay={changeDisplay} /> 
            {createDisplay()}
        </div>
    )
}


export default NeoDisplay;