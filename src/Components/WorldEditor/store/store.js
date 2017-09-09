import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import transforms from "../reducers/transforms";
import canvasOverlay from "../../ShaderEditor/reducers/canvasOverlay";
import scalars from "../../ShaderEditor/reducers/scalars";
import operators from "../../ShaderEditor/reducers/operators";

const reducer = combineReducers({
    transforms: transforms,
    canvasOverlay: canvasOverlay,
    scalars: scalars,
    operators: operators
})

export default createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)