import React, { useState } from "react";

import SelectMultiple from "./SelectMultiple";
import LongTextInput from "./LongTextInput";
import ShortTextInput from "./ShortTextInput";
import StatusUpdate from "./StatusUpdate";

import processQuery from "../queryProcessor"

function NeoInput(props) {

    // State Variables for the form inputs
    const [selectVals, setSelectVals] = useState([]);
    const [queryInput, setQueryInput] = useState("");
    const [dataId, setDataId] = useState("");
    const [dataName, setDataName] = useState("");

    //State variables for the message
    const [showStatus, setShowStatus] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");
    const [statusType, setStatusType] = useState("");

    function handleSubmit(event) {
        let query = queryInput;
        let dataTypes = selectVals;
        let id = dataId;
        let name = dataName;

        processQuery({
            query,
            dataTypes,
            id,
            name
        }).then(newUpload => {
            props.setUpload(newUpload);
            //Turn off message
            setShowStatus(false);
        }).catch(error => {
            errorStatus(error);
        });

        event.preventDefault();
    }

    /**
     * Updates React hooks so that an error message appears on the screen based on the type of error recieved
     * @param { Error } err - The error which should be displayed 
     */
    function errorStatus(err){
        setShowStatus(true);
        setStatusType("error");
        setStatusMsg(err.message);
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

    /**
     * Decides if a status update should be displayed, returns one if it should. 
     */
    function generateStatusUpdate() {
        if (!showStatus)
            return;
        else
            return <StatusUpdate type={statusType} code={statusMsg} exit={clearStatus}/>
    }

    /**
     * Gets rid of status message
     */
    function clearStatus(){
        setShowStatus(false);
    }

    return (
            <form onSubmit={handleSubmit}>

                <div className="neoInputUI">
                    <div className="neo-grid-query">
                        <h3>Input your query:</h3>
                        <LongTextInput id="formQuery" labelName="Neo4J Query:" value={queryInput} onChange={handleQueryChange} />
                    </div>
                    <div className="neo-grid-name">
                        <h3>Identify your data:</h3>
                        <ShortTextInput id="nameData" labelName="Name for Data:" value={dataName} onChange={handleNameChange} />
                        <ShortTextInput id="idData" labelName="Unique ID:" value={dataId} onChange={handleIdChange} />
                    </div>
                    <div className="neo-grid-select-vals">
                        <SelectMultiple values={selectVals} setValues={setSelectVals} />
                    </div>
                    <div className="neo-grid-alert">
                        {generateStatusUpdate()}
                    </div>
                    <div className="neo-grid-submit">
                        <button className="formSubmit" type="submit">+ Submit</button>
                    </div>
                </div>
                
            </form>
    );
}

export default NeoInput;