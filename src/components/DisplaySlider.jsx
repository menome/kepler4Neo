import React from "react";

function DisplaySlider(props){
    
    function setDisplayDB(){
        props.changeDisplay("db");
    }

    function setDisplayQuery(){
        props.changeDisplay("query");
    }

    /**
     * Selects the data-selected attribute for the display slider.
     * This shows which display button is currently active (what is being displayed)
     * It should give the currently displayed thing the part "true"
     * @param {*} name 
     */
    function selectPart(sliderOption){
        if (props.display === sliderOption){
            return "true";
        } else{
            return "false";
        }
    }

    return(
        <div className="displaySlider">
            <button data-selected={selectPart("db")} type="button" onClick={setDisplayDB}>Connect to database</button>
            <button data-selected={selectPart("query")} type="button" onClick={setDisplayQuery}>Perform query</button>
        </div>
    )
}

export default DisplaySlider;