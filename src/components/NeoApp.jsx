import React, {useState} from "react";

//JSX Components
import NeoDisplay from "./NeoDisplay";
import MapData from "./MapData";


function NeoApp(){

    // State for upload. Will be changed by NeoInput upon successful completion of a query.
    const [upload, setUpload] = useState("");

    function updateUpload(newUpload){
        setUpload(newUpload);
        console.log("Updated Upload.");
    }

    return <div>
        <NeoDisplay setUpload={updateUpload}/>
        <MapData mapInfo={upload} />
    </div>
}

export default NeoApp;