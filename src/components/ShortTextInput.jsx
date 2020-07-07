import React from "react";

function ShortTextInput(props) {

    let id = props.id;
    let value = props.value;
    let onChange = props.onChange;
    let labelName = props.labelName;

    return (<div className="shortTextInput">
        <div><label htmlFor={id}>
            {labelName}</label></div>
            <input type="text" value={value} onChange={onChange} />
    </div>);
}

export default ShortTextInput;
