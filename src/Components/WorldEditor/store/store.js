import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import todoReducer from '../reducers/todoReducer';
import messageReducer from '../reducers/messages';
import transforms from "../reducers/transforms";


const reducer = combineReducers({
    todo: todoReducer,
    message: messageReducer,
    transforms: transforms
})

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)