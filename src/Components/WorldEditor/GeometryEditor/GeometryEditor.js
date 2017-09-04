"use strict";
import React from 'react';
import {connect} from 'react-redux'
import ScaleCard from '../components/ScaleCard/ScaleCard';
import RotationCard from '../components/RotationCard/RotationCard';
import {updateScale, updateRotation} from "../reducers/transforms";
import {ReactGridLayout} from 'react-grid-layout';
import {compose, withHandlers} from 'recompose';

const defaultScale = 1;
const defaultRotation = 0;

function GeometryEditorBase(props) {
    return (
        <div>
            <div id="RelativeContainer">
                <div id="CardGrid">
                    <ScaleCard
                        valueX={props.scale.x}
                        valueY={props.scale.y}
                        valueZ={props.scale.z}
                        onXChange={props.handleTransformChange('x', 'scale')}
                        onYChange={props.handleTransformChange('y', 'scale')}
                        onZChange={props.handleTransformChange('z', 'scale')}
                        defaultValue={defaultScale}
                        onClick={props.clickTransformHandler('scale')}/>
                    <RotationCard
                        valueX={props.rotation.x}
                        valueY={props.rotation.y}
                        valueZ={props.rotation.z}
                        onXChange={props.handleTransformChange('x', 'rotation')}
                        onYChange={props.handleTransformChange('y', 'rotation')}
                        onZChange={props.handleTransformChange('z', 'rotation')}
                        defaultValue={defaultRotation}
                        onClick={props.clickTransformHandler('rotation')}/>
                </div>
            </div>
        </div>
    )
}

const GeometryEditor = compose(
    connect(
        (state) => ({scale: state.transforms.scale, rotation: state.transforms.rotation}),
        {updateScale, updateRotation}
    ),
    withHandlers({
        handleTransformChange: props => (axis, transform) => event => {
            handleTransformChange(props, axis, transform, event)
        },
        clickTransformHandler: props => transform => event => {
            clickTransformHandler(props, transform, event)
        }
    })
)(GeometryEditorBase)

export default GeometryEditor;

const clickTransformHandler = (props, transform) => {
        let objectToTransform = window.scene.getObjectByName("cubePlayer");
        objectToTransform[transform].x = props[transform].x;
        objectToTransform[transform].y = props[transform].y;
        objectToTransform[transform].z = props[transform].z;
}

const handleTransformChange = (props, axis, transform, event) => {
    let newTransform = event.target.value;
    switch (transform) {
        case 'rotation':
            props.updateRotation({[axis]: newTransform});
            break;
        case 'scale':
            props.updateScale({[axis]: newTransform});
            break;
    }
}

