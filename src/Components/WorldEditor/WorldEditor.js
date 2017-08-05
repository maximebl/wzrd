import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import GeometryEditor from './GeometryEditor/GeometryEditor.js';

function WorldEditor() {
  return (
    <MuiThemeProvider>
        <div id="FlexContainer">
            <GeometryEditor />
            <div id="viewport" className="viewport"></div>
        </div>
    </MuiThemeProvider>
  );
}

ReactDOM.render(<WorldEditor />, document.querySelector('#WorldEditor'));

module.hot.accept();