import React from 'react';
import {compose, lifecycle} from 'recompose';
import {ShaderCard} from "../ShaderCard/ShaderCard";

const VectorTwoBase = (props) => {
    return(
        <ShaderCard
            id={props.id}
            container={props.container}
            styleSheet={props.styleSheet}
        />
    )
}

export const VectorTwo = compose(
    lifecycle({
        componentDidMount: function() {

        },
    })
)(VectorTwoBase);
