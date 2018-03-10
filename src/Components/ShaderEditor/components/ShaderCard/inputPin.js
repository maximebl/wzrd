import React from 'react';
import {compose} from 'recompose';
import {addInput} from "../../reducers/inputs";
import {connect} from 'react-redux';
import {withDragAndDrop} from "../pinDrag";
import {withLineDrag} from "../../Utilities/withLineDrag";

const styleSheet = {

    input: {
        backgroundColor: 'gray',
        position: 'relative',
        height: 20,
        width: 20,
        left: 0,
        top: 20,
        float: 'left'
    }
}

const InputPinBase = (props) => (
    <div id={props.uid}
         ref={props.onRef}
         className="input"
         style={styleSheet.input}>
    </div>
)

export const InputPin = compose(
    connect((state) => (
            {inputs: state.inputs}
        ),
        {addInput}
    ),
    withLineDrag
)(InputPinBase);

