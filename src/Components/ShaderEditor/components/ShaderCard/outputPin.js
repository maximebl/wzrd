import React from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {addOutput} from "../../reducers/outputs";
import {withLineDrag} from "../../Utilities/withLineDrag";

const localStyleSheet = {
    backgroundColor: 'gray',
    position: 'relative',
    height: 20,
    width: 20,
    float: 'right'
}

const OutputPinBase = (props) => (
    <div id={props.uid}
         ref={props.onRef}
         className="output"
         style={localStyleSheet}>
    </div>
)

export const OutputPin = compose(
    connect((state) => ({
        outputs: state.outputs,
        inputs: state.inputs,
        nodes: state.nodes
    }),
        {addOutput}
    ),
    withLineDrag
)(OutputPinBase);

