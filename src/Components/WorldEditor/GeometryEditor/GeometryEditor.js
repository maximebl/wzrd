"use strict";
import React from 'react';
import ScaleCard from  '../components/ScaleCard';
var ReactGridLayout = require('react-grid-layout');

const defaultScale = 1.0;

export default class GeometryEditor extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            scaleX: defaultScale,
            scaleY: defaultScale,
            scaleZ: defaultScale
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.handleXChange = this.handleXChange.bind(this);
        this.handleYChange = this.handleYChange.bind(this);
        this.handleZChange = this.handleZChange.bind(this);
    }

    clickHandler(){
        let objectToScale = window.scene.getObjectByName( "cubePlayer" );

        objectToScale.scale.x = this.state.scaleX;
        objectToScale.scale.y = this.state.scaleY;
        objectToScale.scale.z = this.state.scaleZ;
    }

    handleXChange(event){
        let inputValue = event.target.value;
        this.setState({
            scaleX:inputValue
        });
    };

    handleYChange(event){
        let inputValue = event.target.value;
        this.setState({
            scaleY:inputValue
        });
    };

    handleZChange(event){
        let inputValue = event.target.value;
        this.setState({
            scaleZ:inputValue
        });
    };

    render(){
        return (

        <div style={{width:'100%'}}>

            <div id="FlexContainer">

                <div style={{backgroundColor: 'red', height:'200px', width: '500px'}} />

                <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1500} isBounded={true}>
                    <div style={{backgroundColor: 'red'}} key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>
                    <div style={{backgroundColor: 'blue'}} key="b" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
                    <div style={{backgroundColor: 'green'}} key="c" data-grid={{x: 4, y: 0, w: 1, h: 2}}>c</div>
                </ReactGridLayout>
                {/*<ScaleCard*/}
                    {/*valueX={this.state.scaleX}*/}
                    {/*valueY={this.state.scaleY}*/}
                    {/*valueZ={this.state.scaleZ}*/}

                    {/*onXChange={this.handleXChange}*/}
                    {/*onYChange={this.handleYChange}*/}
                    {/*onZChange={this.handleZChange}*/}

                    {/*defaultValue={this.defaultScale}*/}
                    {/*onClick={this.clickHandler}*/}
                {/*/>*/}
            </div>
        </div>
        )
    }

}
