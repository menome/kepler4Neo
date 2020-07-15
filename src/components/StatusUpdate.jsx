import React from "react";

import MDIcon from "./MDIcon";

function StatusUpdate(props) {

    function getStatusType() {
        switch (props.type) {
            case "success":
                return "statusUpdateSuccess";
            case "error":
                return "statusUpdateError";
            default:
                return "statusUpdateError";
        }
    }

    function getIconType() {
        switch (props.type) {
            case "success":
                return "login";
            case "error":
                return "warning";
            default:
                return "warning";
        }
    }

    function getStatusMessage() {
        switch (props.code) {
            // Cases for database login
            case "Neo.ClientError.Security.Unauthorized":
                return "Authentication failed. Ensure URL, username, and password are correct.";
            case "ServiceUnavailable":
                return "Could not connect to database at given URL. Ensure URL is correct.";
            case 12:
                return "Could not connect to database at given URL. Ensure URL is correct.";
            case "Unknown scheme: null":
                return "Invalid URL. Ensure you are using a valid Bolt URL.";
            case "login":
                return "Successfully logged in to database.";
            // Cases for query submit
            case "blankQuery":
                return "Could not process query - no cypher query recieved.";
            case "blankId":
                return "Could not process query - no id for data specified.";
            case "blankName":
                return "Could not process query - no name for data specified.";
            case "blankReturn":
                return "Could not process query - no return types specified.";
            case "noRes":
                return "No response recieved from Neo4J. Check your connection and your query."
            default:
                return props.code;
        }
    }
    return (
        <div className={getStatusType()}>
            <div className="status-grid">
                <div className="status-grid-icon">
                    <MDIcon icon={getIconType()} />
                </div>
                <div className="status-grid-text">
                    {getStatusMessage()}
                </div>
                <div className="status-grid-exit">
                    <button className="exit-status-message" type="button" onClick={props.exit}>
                        <MDIcon icon={"close"} />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default StatusUpdate;