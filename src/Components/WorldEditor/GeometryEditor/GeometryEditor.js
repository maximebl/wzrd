"use strict";
import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const defaultScale = 1.0;

export default class GeometryEditor extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            scale: defaultScale
        };
    }

    clickHandler(e){
        let objectToScale = scene.getObjectByName( "cubePlayer" );
        objectToScale.scale(5,5);
    }

    render(){
        return (
            <div>
                <TextField
                    value={this.state.scale}
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
