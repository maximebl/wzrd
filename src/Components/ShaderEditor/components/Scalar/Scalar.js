import React from 'react';
import {compose, lifecycle} from 'recompose';
import {ShaderCard} from "../ShaderCard/ShaderCard";

const ScalarBase = (props) => {
    return(
        <ShaderCard
            id={props.id}
            container={props.container}
            styleSheet={props.styleSheet}
        />
    )
}

export const Scalar = compose(
    lifecycle({
        componentDidMount: function() {

        },
    })
)(ScalarBase);
