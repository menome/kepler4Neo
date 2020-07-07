import React, {useState} from "react";

//JSX Components
import NeoInput2 from "./NeoInput2";
import MapData from "./MapData";


function NeoApp(){

    // State for upload. Will be changed by NeoInput upon successful completion of a query.
    const [upload, setUpload] = useState("");

    function updateUpload(newUpload){
        setUpload(newUpload);
        console.log("Updated Upload.");
    }

    return <div>
        <NeoInput2 setUpload={updateUpload}/>
        <MapData mapInfo={upload} />
    </div>
}

export default NeoApp;