import React from "react";


function LongTextInput(props) {

    let id = props.id;
    let value = props.value;
    let onChange = props.onChange;
    let labelName = props.labelName;

    return (<div className="longTextInput">
        <label htmlFor={id}>
            {labelName}
        </label>
        <textarea
            id={id}
            className="neoQuery"
            rows="4"
            cols="50"
            value={value}
            onChange={onChange} 
        />
    </div>);
}

export default LongTextInput;