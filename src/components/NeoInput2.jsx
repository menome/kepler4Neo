import React, { useState } from "react";

import SelectMultiple from "./SelectMultiple";
import LongTextInput from "./LongTextInput";
import ShortTextInput from "./ShortTextInput";
import { login } from "../neo4jConnection";

import processQuery from "../queryProcessor"

function NeoInput2(props) {

    // State Variables for the form inputs
    const [selectVals, setSelectVals] = useState([]);
    const [queryInput, setQueryInput] = useState("");
    const [dataId, setDataId] = useState("");
    const [dataName, setDataName] = useState("");

    function handleSubmit(event) {
        let query = queryInput;
        let dataTypes = selectVals;
        let id = dataId;
        let name = dataName;

        if (!query) {
            alert("You cannot submit a blank query.");
            event.preventDefault();
            return;
        }

        //TODO: Add validation? Check id and name are alright?
        processQuery({
            query,
            dataTypes,
            id,
            name
        }).then(newUpload => {
            alert("the upload is " + JSON.stringify(newUpload));
            props.setUpload(newUpload);
        }).catch(error => {
            alert(error.message);
        });

        event.preventDefault();
    }

    function handleQueryChange(event) {
        setQueryInput(event.target.value);
    }

    function handleIdChange(event) {
        setDataId(event.target.value);
    }
    function handleNameChange(event) {
        setDataName(event.target.value);
    }

    function doLogin(){
        login("bolt://localhost:7687", "neo4j", "pass");
    }

    return (
        <div className="neoInputArea">
            <div><h2>kepler4Neo Input</h2></div>

            <form onSubmit={handleSubmit}>

                <div className="row">
                    <div className="col-lg-6">
                        <LongTextInput id="formQuery" labelName="Neo4J Query:" value={queryInput} onChange={handleQueryChange} />
                    </div>
                    <div className="col-lg-6">
                        <ShortTextInput id="nameData" labelName="Name for Data:" value={dataName} onChange={handleNameChange} />
                        <ShortTextInput id="idData" labelName="Unique ID:" value={dataId} onChange={handleIdChange} />
                    </div>
                </div>
                <div className="row">
                    <SelectMultiple values={selectVals} setValues={setSelectVals} />
                </div>
                <input className="btn btn-success" type="submit" value="+ Submit" />
            </form>
        </div>

    );
}

export default NeoInput2;

//TODO: Add login button
/* 
                <button type='button' value='remove' className="btn btn-outline-info" onClick={doLogin}>
                    Login!
                </button>

*/