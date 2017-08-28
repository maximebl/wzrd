import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCurrent, saveTodo} from './WorldEditor/reducers/todoReducer';

class TodoForm extends Component{
    handleInputChange = (evt) => {
        const val = evt.target.value
        this.props.updateCurrent(val)
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        this.props.saveTodo(this.props.currentTodo)
    }

    render() {
        const {currentTodo} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                       value={currentTodo}
                       onChange={this.handleInputChange}/>
            </form>
        )
    }
}
export default connect(
    (state) => ({currentTodo: state.todo.currentTodo}),
    {updateCurrent, saveTodo}
)(TodoForm)