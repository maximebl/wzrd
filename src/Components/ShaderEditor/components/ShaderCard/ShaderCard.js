import React from 'react';
import {connect} from 'react-redux';
import {compose, setObservableConfig} from 'recompose';
import {InputPin} from "./inputPin";
import {OutputPin} from "./outputPin";
import {addInput} from "../../reducers/inputs";
import config from "recompose/rxjsObservableConfig";
import {DragZone} from "../../Utilities/DragZone";
import {times} from "ramda";

setObservableConfig(config);

let localStyleSheet = {
    backgroundColor: 'red',
    width: 200,
    height: 200
}

const ShaderCardBase = (props) => (
    <DragZone width={200} height={200}>
        <div style={localStyleSheet}>
            {times((val) => <InputPin key={val} index={val} owner={props.owner}/>, props.inputCount)}
            {times((val) => <OutputPin key={val} index={val} owner={props.owner}></OutputPin>, props.outputCount)}
        </div>
    </DragZone>
)

export const ShaderCard = compose(
    connect((state) => (
            {inputs: state.inputs}
        ),
        {addInput}
    )
)(ShaderCardBase);
