import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import transforms from "../reducers/transforms";
import canvasOverlay from "../../ShaderEditor/reducers/canvasOverlay";

const reducer = combineReducers({
    transforms: transforms,
    canvasOverlay: canvasOverlay
})

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)