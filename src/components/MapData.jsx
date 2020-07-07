import React from "react";

import { useDispatch } from "react-redux";
import { addDataToMap } from "kepler.gl/actions";

function MapData(props) {
    //TODO: Remove alert
    //alert("Reloaded map data!");
    const dispatch = useDispatch();
    React.useEffect(() => {
        addData(dispatch, props.mapInfo);
    });
    return <div></div>;
}

function addData(dispatch, mapInfo) {
    if (mapInfo) {
        dispatch(
            addDataToMap(
                {
                    datasets: {
                        info: {
                            label: mapInfo.label,
                            id: mapInfo.id
                        },
                        data: mapInfo.data,
                    },
                    option: {
                        centerMap: true,
                        readOnly: false
                    },
                    config: mapInfo.config//TODO: Allow users to change config?
                })
        );
    }
}

export default MapData;