import React from 'react';
import {compose, lifecycle} from 'recompose';
import {ShaderCard} from "../ShaderCard/ShaderCard";

const AdditionBase = (props) => (
    <ShaderCard
        id={props.id}
        owner={props.owner}
        container={props.container}
        inputCount={2}
        outputCount={1}
        styleSheet={props.styleSheet}>
    </ShaderCard>
)

export const Addition = compose(
    lifecycle({
        componentDidMount: function() {
        },
    })
)(AdditionBase);


