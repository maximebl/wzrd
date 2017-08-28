import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import GeometryEditor from './GeometryEditor/GeometryEditor.js';

export function WorldEditor() {
  return (
    <MuiThemeProvider>
        <div id="FlexContainer">
            <GeometryEditor />
            <div id="viewport" className="viewport"></div>
        </div>
    </MuiThemeProvider>
  );
}

module.hot.accept();