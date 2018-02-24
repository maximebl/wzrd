import React from 'react';
import {compose, lifecycle} from 'recompose';
import {ShaderCard} from "../ShaderCard/ShaderCard";

const ScalarBase = (props) => (
    <ShaderCard
        id={props.id}
        owner={props.owner}
        container={props.container}
        inputCount={0}
        outputCount={1}
        styleSheet={props.styleSheet}
    />
)

export const Scalar = compose(
    lifecycle({
        componentDidMount: function() {

        },
    })
)(ScalarBase);
