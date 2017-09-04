import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Provider} from 'react-redux';
import store from './Components/WorldEditor/store/store';
import WorldEditor from "./Components/WorldEditor/WorldEditor"
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {ShaderEditor} from "./Components/ShaderEditor/ShaderEditor";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <ul>
                            <li><Link to="/">World Editor</Link></li>
                            <li><Link to="/ShaderEditor">Shader Editor</Link></li>
                        </ul>
                        <Route exact path="/" component={WorldEditor}/>
                        <Route path="/ShaderEditor" component={ShaderEditor}/>
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
    document.querySelector('#WorldEditor')
);

