import React from 'react';
import {compose, lifecycle} from 'recompose';
import {ShaderCard} from "../ShaderCard/ShaderCard";

const AddBase = (props) => {
    return(
        <ShaderCard
            id={props.id}
            container={props.container}
            styleSheet={props.styleSheet}
        />
    )
}

export const Add = compose(
    lifecycle({
        componentDidMount: function() {

        },
    })
)(AddBase);
