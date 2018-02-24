import {createStore, applyMiddleware, combineReducers} from 'redux';
import {combineEpics, createEpicMiddleware } from 'redux-observable';
import {composeWithDevTools} from 'redux-devtools-extension';
import canvasOverlay from "../reducers/canvasOverlay";
import nodes from '../reducers/nodes';
import inputs from '../reducers/inputs';
import outputs from '../reducers/outputs';
import {updateStoreInputsEpic} from "../components/pinDrag";

const reducers = combineReducers({
    canvasOverlay: canvasOverlay,
    nodes: nodes,
    inputs: inputs,
    outputs: outputs
})

const epics = combineEpics(updateStoreInputsEpic);
const epicMiddleware = createEpicMiddleware(epics);

export default createStore(
    reducers,
    composeWithDevTools(applyMiddleware(epicMiddleware))
)