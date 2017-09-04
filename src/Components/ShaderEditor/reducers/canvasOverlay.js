const defaultWidth = 500;
const defaultHeight = 400;

const initState = {
    canvasDimensions: {
        width: defaultWidth,
        height: defaultHeight
    }
}

const UPDATE_CANVAS_DIMENSIONS = 'UPDATE_CANVAS_DIMENSIONS';

export const updateCanvasDimensions = (val) => ({type: UPDATE_CANVAS_DIMENSIONS, payload: val});

export default (state = initState, action) => {
    switch (action.type) {
        case UPDATE_CANVAS_DIMENSIONS:
            return {...state, canvasDimensions: {...state.canvasDimensions, ...action.payload}}
        default:
            return state
    }
}
