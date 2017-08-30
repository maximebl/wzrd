"use strict";
import React from 'react';
import {connect} from 'react-redux'
import ScaleCard from '../components/ScaleCard/ScaleCard';
import RotationCard from '../components/RotationCard/RotationCard';
import {updateScale, updateRotation} from "../reducers/transforms";
import {ReactGridLayout} from 'react-grid-layout';
import {compose, withHandlers} from 'recompose';

const defaultScale = "1";
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
                        onXChange={props.handleScaleChange('x')}
                        onYChange={props.handleScaleChange('y')}
                        onZChange={props.handleScaleChange('z')}
                        defaultValue={defaultScale}
                        onClick={props.clickScaleHandler}/>
                    {/*<RotationCard*/}
                        {/*valueX={props.rotX}*/}
                        {/*valueY={props.rotY}*/}
                        {/*valueZ={props.rotZ}*/}
                        {/*onXChange={handleRotXChange}*/}
                        {/*onYChange={handleRotYChange}*/}
                        {/*onZChange={handleRotZChange}*/}
                        {/*defaultValue={defaultRotation}*/}
                        {/*onClick={clickRotationHandler}/>*/}
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
        handleScaleChange: props => axis => event=> {
            handleScaleChange(props, axis, event);
        },
        clickScaleHandler: props => {
            clickScaleHandler(props)
        }
    })
)(GeometryEditorBase)

export default GeometryEditor;

const clickScaleHandler = (props) => {
    let objectToScale = window.scene.getObjectByName("cubePlayer");
    objectToScale.scale.x = props.scale.x;
    objectToScale.scale.y = props.scale.y;
    objectToScale.scale.z = props.scale.z;
}

function handleScaleChange(props, axis, event) {
    let newScale = event.target.value;
    props.updateScale({[axis]: newScale});
}

