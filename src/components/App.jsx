import React from "react";
import {Provider} from "react-redux";

//JSX Imports
import {Map} from "./Map.jsx";
import NeoApp from "./NeoApp.jsx";
import store from "./store";

export default function App(){
    return <Provider store={store}> 
    <Map />
    <NeoApp/>
    </Provider>
}

