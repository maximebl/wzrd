"use strict";
import React from 'react';
import ScaleCard from '../components/ScaleCard/ScaleCard';
import RotationCard from '../components/RotationCard/RotationCard';
var ReactGridLayout = require('react-grid-layout');

const defaultScale = 1.0;
const defaultRotation = 0;

export default class GeometryEditor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scaleX: defaultScale,
            scaleY: defaultScale,
            scaleZ: defaultScale,

            rotX: defaultRotation,
            rotY: defaultRotation,
            rotZ: defaultRotation,
        };
        this.clickScaleHandler = this.clickScaleHandler.bind(this);
        this.clickRotationHandler = this.clickRotationHandler.bind(this);
        this.handleScaleXChange = this.handleScaleXChange.bind(this);
        this.handleScaleYChange = this.handleScaleYChange.bind(this);
        this.handleScaleZChange = this.handleScaleZChange.bind(this);

        this.handleRotXChange = this.handleRotXChange.bind(this);
        this.handleRotYChange = this.handleRotYChange.bind(this);
        this.handleRotZChange = this.handleRotZChange.bind(this);
    }
    clickScaleHandler(){
        let objectToScale = window.scene.getObjectByName( "cubePlayer" );
        objectToScale.scale.x = this.state.scaleX;
        objectToScale.scale.y = this.state.scaleY;
        objectToScale.scale.z = this.state.scaleZ;
    }

    clickRotationHandler(){
        let objectToRotate = window.scene.getObjectByName( "cubePlayer" );
        objectToRotate.rotation.x = this.state.rotX;
        objectToRotate.rotation.y = this.state.rotY;
        objectToRotate.rotation.z = this.state.rotZ;
    }

    handleScaleXChange(event){
        let inputValue = event.target.value;
        this.setState({
            scaleX:inputValue
        });
    };
    handleScaleYChange(event){
        let inputValue = event.target.value;
        this.setState({
            scaleY:inputValue
        });
    };
    handleScaleZChange(event){
        let inputValue = event.target.value;
        this.setState({
            scaleZ:inputValue
        });
    };

    handleRotXChange(event){
        let inputValue = event.target.value;
        this.setState({
            rotX:inputValue
        });
    };
    handleRotYChange(event){
        let inputValue = event.target.value;
        this.setState({
            rotY:inputValue
        });
    };
    handleRotZChange(event){
        let inputValue = event.target.value;
        this.setState({
            rotZ:inputValue
        });
    };

    render(){
        return (
        <div>
            <div id="RelativeContainer">
                <div id="CardGrid">
                    <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1500} isBounded={true}>
                        <div key="c" data-grid={{x: 0, y: 0, w: 4, h: 8}}>
                            <ScaleCard
                                valueX={this.state.scaleX}
                                valueY={this.state.scaleY}
                                valueZ={this.state.scaleZ}
                                onXChange={this.handleScaleXChange}
                                onYChange={this.handleScaleYChange}
                                onZChange={this.handleScaleZChange}
                                defaultValue={this.defaultScale}
                                onClick={this.clickScaleHandler}/>
                        </div>
                        <div key="d" data-grid={{x: 0, y: 1, w: 4, h: 8}}>
                            <RotationCard
                                valueX={this.state.rotX}
                                valueY={this.state.rotY}
                                valueZ={this.state.rotZ}
                                onXChange={this.handleRotXChange}
                                onYChange={this.handleRotYChange}
                                onZChange={this.handleRotZChange}
                                onClick={this.clickRotationHandler}/>
                        </div>
                    </ReactGridLayout>
                </div>
            </div>
        </div>
        )
    }
}
