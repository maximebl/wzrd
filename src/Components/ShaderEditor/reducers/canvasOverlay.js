const defaultCanvasWidth = 1000;
const defaultCanvasHeight = 1000;

const defaultNodeWidth = 200;
const defaultNodeHeight = 200;

const initState = {
    canvasDimensions: {
        width: defaultCanvasWidth,
        height: defaultCanvasHeight
    },
    nodeDimensions: {
        width: defaultNodeWidth,
        height: defaultNodeHeight
    },
    uiScale: 1,
    links: []
}

const UPDATE_CANVAS_DIMENSIONS = 'UPDATE_CANVAS_DIMENSIONS';
const ADD_LINK = 'ADD_LINK';

export const updateCanvasDimensions = (val) => ({type: UPDATE_CANVAS_DIMENSIONS, payload: val});
export const addLink = (val) => ({type: ADD_LINK, payload: val});

export default (state = initState, action) => {
    switch (action.type) {
        case UPDATE_CANVAS_DIMENSIONS:
            return {...state, canvasDimensions: {...state.canvasDimensions, ...action.payload}}
        break;

        case ADD_LINK:
            return Object.assign({}, state, {links: [...state.links, action.payload]})
            break;
        default:
            return state
    }
}
