import React, { useState } from "react";

import { login } from "../neo4jConnection";

//JSX Imports
import ShortTextInput from "./ShortTextInput";
import StatusUpdate from "./StatusUpdate";

function DbUI() {

    const [uri, setUri] = useState("bolt://localhost:7687");
    const [dbUser, setDbUser] = useState("neo4j");
    const [dbPass, setDbPass] = useState("");

    const [displayStatus, setDisplayStatus] = useState(false);
    const [displayMsg, setDisplayMsg] = useState("");
    const [statusType, setStatusType] = useState("");

    function handleUriChange(event) {
        setUri(event.target.value);
    }
    function handleDbUserChange(event) {
        setDbUser(event.target.value);
    }
    function handleDbPassChange(event) {
        setDbPass(event.target.value);
    }

    /**
     * Logs in the user to the database credentials they specified
     * @param { Event } event - The event that triggered the calling of this function 
     */
    function completeLogin(event) {


        login(uri, dbUser, dbPass).then(resp => {
            setDisplayStatus(true);
            setDisplayMsg(resp.code);
            setStatusType(resp.type);
        })
            .catch(err => {
                alert("errHandle:" + err.message);
            });

        //Neo.ClientError.Security.Unauthorized
        //ServiceUnavailable

        event.preventDefault();
    }

    /**
     * Decides if a status update should be displayed, returns one if it should. 
     */
    function generateStatusUpdate() {
        if (!displayStatus)
            return;
        else
            return <StatusUpdate type={statusType} code={displayMsg} exit={clearStatus} />
    }

    /**
     * Gets rid of status message when called.
     */
    function clearStatus(){
        setDisplayStatus(false);
    }

    return (<form onSubmit={completeLogin}>
    <div className="db-UI">

            <div className="db-img"><img className="db-icon-img" alt="" src="images/database.png" /></div>
            <div className="db-login">
                <ShortTextInput id="dbURI" labelName="Database URI" value={uri} onChange={handleUriChange} />
                <ShortTextInput id="dbUsername" labelName="Database Username" value={dbUser} onChange={handleDbUserChange} />
                <ShortTextInput id="dbPassword" labelName="Database Password" value={dbPass} onChange={handleDbPassChange} />
            </div>
            <div className="db-connect">
                <button className="formSubmit" type="submit">Connect</button>
            </div>

        <div className="db-msg">
                {generateStatusUpdate()}
        </div>
    </div>
    </form>)
}

export default DbUI;