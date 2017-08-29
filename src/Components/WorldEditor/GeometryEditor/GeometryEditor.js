"use strict";
import React from 'react';
import {connect} from 'react-redux'
import ScaleCard from '../components/ScaleCard/ScaleCard';
import RotationCard from '../components/RotationCard/RotationCard';
import {updateScale, updateRotation} from "../reducers/transforms";
import {ReactGridLayout} from 'react-grid-layout';
import {compose, withHandlers, withProps} from 'recompose';

const defaultScale = "1";
const defaultRotation = 0;

function GeometryEditorBase (props) {
    console.log(props);
    return (
            <div>
                <div id="RelativeContainer">
                    <div id="CardGrid">
                        {/*<ReactGridLayout className="layout" cols={12} rowHeight={30} width={1500} isBounded={true}>*/}
                            {/*<div key="c" data-grid={{x: 0, y: 0, w: 4, h: 8}}>*/}
                                <ScaleCard
                                    valueX={props.scale.x}
                                    // valueY={this.props.scale.y}
                                    // valueZ={this.props.scale.z}
                                    onXChange={handleScaleXChange}
                                    // onYChange={this.handleScaleYChange}
                                    // onZChange={this.handleScaleZChange}
                                    defaultValue={defaultScale}
                                    onClick={clickScaleHandler}/>
                            {/*</div>*/}
                            {/*<div key="d" data-grid={{x: 0, y: 1, w: 4, h: 8}}>*/}
                            {/*<RotationCard*/}
                            {/*valueX={this.props.rotX}*/}
                            {/*valueY={this.props.rotY}*/}
                            {/*valueZ={this.props.rotZ}*/}
                            {/*onXChange={this.handleRotXChange}*/}
                            {/*onYChange={this.handleRotYChange}*/}
                            {/*onZChange={this.handleRotZChange}*/}
                            {/*defaultValue={this.defaultRotation}*/}
                            {/*onClick={this.clickRotationHandler}/>*/}
                            {/*</div>*/}
                        {/*</ReactGridLayout>*/}
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
    withHandlers({handleScaleXChange: props => event => handleScaleXChange(event, props)})
)(GeometryEditorBase)

export default GeometryEditor;

const clickScaleHandler = () => {
    let objectToScale = window.scene.getObjectByName( "cubePlayer" );
    objectToScale.scale.x = this.props.scale.x;
    objectToScale.scale.y = this.props.scale.y;
    objectToScale.scale.z = this.props.scale.z;
}

function handleScaleXChange (event, props) {
    let newScaleX = event.target.value;
    props.updateScale({x: newScaleX});
}

// class GeometryEditor extends React.Component {
//     constructor(props){
//         super(props);
//         this.clickScaleHandler = this.clickScaleHandler.bind(this);
//         this.clickRotationHandler = this.clickRotationHandler.bind(this);
//         this.handleScaleXChange = this.handleScaleXChange.bind(this);
//         this.handleScaleYChange = this.handleScaleYChange.bind(this);
//         this.handleScaleZChange = this.handleScaleZChange.bind(this);
//
//         this.handleRotXChange = this.handleRotXChange.bind(this);
//         this.handleRotYChange = this.handleRotYChange.bind(this);
//         this.handleRotZChange = this.handleRotZChange.bind(this);
//     }
//     clickScaleHandler(){
//         let objectToScale = window.scene.getObjectByName( "cubePlayer" );
//         objectToScale.scale.x = this.props.scale.x;
//         objectToScale.scale.y = this.props.scale.y;
//         objectToScale.scale.z = this.props.scale.z;
//     }
//     clickRotationHandler(){
//         let objectToRotate = window.scene.getObjectByName( "cubePlayer" );
//         objectToRotate.rotation.x = this.props.rotation.x;
//         objectToRotate.rotation.y = this.props.rotation.y;
//         objectToRotate.rotation.z = this.props.rotation.z;
//     }
//     handleScaleXChange(event){
//         let newScaleX = event.target.value;
//         this.props.updateScale({x: newScaleX});
//     };
//     handleScaleYChange(event){
//         let newScaleY = event.target.value;
//         this.props.updateScale({y: newScaleY});
//     };
//     handleScaleZChange(event){
//         let newScaleZ = event.target.value;
//         this.props.updateScale({z: newScaleZ});
//     };
//     handleRotXChange(event){
//         let newRotX = event.target.value;
//         this.props.updateRotation({x: newRotX})
//     };
//     handleRotYChange(event){
//         let newRotY = event.target.value;
//         this.props.updateRotation({y: newRotY})
//     };
//     handleRotZChange(event){
//         let newRotZ = event.target.value;
//         this.props.updateRotation({z: newRotZ})
//     };
//
//     render(){
//         return (
//         <div>
//             <div id="RelativeContainer">
//                 <div id="CardGrid">
//                     <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1500} isBounded={true}>
//                         <div key="c" data-grid={{x: 0, y: 0, w: 4, h: 8}}>
//                             <ScaleCard
//                                 valueX={this.props.scale.x}
//                                 valueY={this.props.scale.y}
//                                 valueZ={this.props.scale.z}
//                                 onXChange={this.handleScaleXChange}
//                                 onYChange={this.handleScaleYChange}
//                                 onZChange={this.handleScaleZChange}
//                                 defaultValue={this.defaultScale}
//                                 onClick={this.clickScaleHandler}/>
//                         </div>
//                         <div key="d" data-grid={{x: 0, y: 1, w: 4, h: 8}}>
//                             <RotationCard
//                                 valueX={this.props.rotX}
//                                 valueY={this.props.rotY}
//                                 valueZ={this.props.rotZ}
//                                 onXChange={this.handleRotXChange}
//                                 onYChange={this.handleRotYChange}
//                                 onZChange={this.handleRotZChange}
//                                 defaultValue={this.defaultRotation}
//                                 onClick={this.clickRotationHandler}/>
//                         </div>
//                     </ReactGridLayout>
//                 </div>
//             </div>
//         </div>
//         )
//     }
// }
// export default connect(
//     (state) => ({scale: state.transforms.scale, rotation: state.transforms.rotation}),
//     {updateScale, updateRotation}
// )(GeometryEditor)
