import React from "react";
import MDIcon from "./MDIcon";

function SelectMultiple(props) {
    // Assume we have props.values and props.setValues()

    // Default value for select bars to start at
    const defaultSelect = 'real';

    function createUI() {
        if (!props.values)
            return;
        return props.values.map((val, i) =>
            <div className="select-type-bar" key={i}>
                <select value={val || defaultSelect} onChange={(e) => { handleSelectChange(e, i) }} >
                    <option value="real">Real Number</option>
                    <option value="date">Date</option>
                    <option value="integer">Integer</option>
                    <option value="string">String</option>
                    <option value="boolean">Boolean</option>
                    <option value="geojson">GeoJson String / WKT String</option>
                    <option value="timestamp">Timestamp</option>
                </select>
                <button type='button' value='remove' className="select-data-remove" onClick={(e) => { removeSelectBar(i) }}>
                    X
                </button>
            </div>
        )
    }

    function handleSelectChange(event, i) {
        let val = event.target.value;
        let temp = props.values;
        temp[i] = val;
        props.setValues([...temp]);
    }

    function removeSelectBar(i) {
        let selectValues = props.values;
        selectValues.splice(i, 1);
        props.setValues([...selectValues]);
    }

    function addSelectBar() {
        let temp = props.values;
        if (!temp) {
            props.setValues([defaultSelect]);
            console.log("select vals are" + props.values);
            return;
        }
        temp.push(defaultSelect);
        props.setValues([...temp]);
    }

    return (
        <div>
        <h3>Select your data types:</h3>
        <div className="select-data-types">
                <div>
                    {createUI()}
                </div>
            <button type="button" className="select-data-add" onClick={addSelectBar}>
                + Add more data 
            </button>
        </div>
        </div>
    )
}

export default SelectMultiple

/*<MDIcon icon="add_circle"></MDIcon>*/
/*<MDIcon icon="delete"></MDIcon>*/