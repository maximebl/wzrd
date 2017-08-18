import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { MuiThemeProvider } from 'material-ui/styles';
import GeometryEditor from './GeometryEditor/GeometryEditor.js';

import {Provider} from 'react-redux';
import App from '../../App';

const state = store.getState();

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

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#WorldEditor')
);

module.hot.accept();