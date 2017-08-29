import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import {Provider} from 'react-redux';
import store from './Components/WorldEditor/store/store';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Message from "./Components/Message";
import Footer from './Components/footer';
import {WorldEditor} from "./Components/WorldEditor/WorldEditor"

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>WZRD Editor</h2>
                </div>
                <Router>
                    <div className="Todo-App">
                        <Message />
                        <TodoForm />
                        <Route path="/:filter?" render={({match}) => (
                            <TodoList filter={match.params.filter}/>
                        )} />
                        <Footer/>
                    </div>
                </Router>
                <WorldEditor/>
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

