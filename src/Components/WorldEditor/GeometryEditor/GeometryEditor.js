"use strict";
import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const defaultScale = 5.0;

export default class GeometryEditor extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            scale: defaultScale
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        let objectToScale = window.scene.getObjectByName( "cubePlayer" );
        objectToScale.scale.x = this.state.scale;
        objectToScale.scale.y = this.state.scale;
        objectToScale.scale.z = this.state.scale;
    }

    // handleInputChange = (event, newValue) => {
    //     let targetName = event.target.name;
    //
    //     this.setState((prevState, props) => {
    //         return {counter: prevState.counter + props.step};
    //     });
    // }

    render(){
        return (
            <div>
                <TextField
                    value={this.state.scale}
                    // onChange={this.handleInputChange}
                    id="GeometryScale"
                    label="Scale"
                    type="text"
                    InputProps={{ placeholder: 'Scale of the cube' }}
                    helperText="Scale"
                    defaultValue={this.defaultScale}
                    marginForm />

                <Button onClick={this.clickHandler}
                        raised
                        color="accent">
                    Set
                </Button>
            </div>
        )
    }

}
