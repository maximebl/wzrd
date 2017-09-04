import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import GeometryEditor from './GeometryEditor/GeometryEditor.js';
import {compose, lifecycle} from 'recompose';
import './WorldEditor.css';

function WorldEditorBase() {
  return (
    <MuiThemeProvider>
        <div>
            <div className="WorldEditor-header">
                <h2>World Editor</h2>
            </div>
            <div id="FlexContainer">
                <GeometryEditor />
                <div id="viewport" className="viewport"></div>
            </div>
        </div>
    </MuiThemeProvider>
  );
}
const WorldEditor = compose(
    lifecycle({
        componentDidMount() {
            if(window.renderer){
                document.getElementById( 'viewport' ).appendChild( window.renderer.domElement );
            }
        }
    })
)(WorldEditorBase)

export default WorldEditor;

module.hot.accept();