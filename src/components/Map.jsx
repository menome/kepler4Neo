import React from "react";
import KeplerGl from "kepler.gl";

//Kepler Gl Map Component
function Map() {

    return (
        <KeplerGl
            id="mainMap"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
            width={window.innerWidth}
            height={window.innerHeight}>
        </KeplerGl>
    );
}

export { Map };


