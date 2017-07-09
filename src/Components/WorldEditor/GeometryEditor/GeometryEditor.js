import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

export default function GeometryEditor() {
  return (
    <div>
        <TextField
        id="GeometryScale"
        label="Scale"
        type="text"
        InputProps={{ placeholder: 'Scale of the cube' }}
        helperText="Scale"
        marginForm />

        <Button raised color="accent">
        Set
        </Button>
    </div>
    
  )
}