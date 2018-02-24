import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Provider} from 'react-redux';
import store from './Components/ShaderEditor/store/store';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ShaderEditor} from "./Components/ShaderEditor/ShaderEditor";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Route exact path="/" component={ShaderEditor}/>
                    </div>
                </Router>
            </div>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#ShaderEditor')
);

