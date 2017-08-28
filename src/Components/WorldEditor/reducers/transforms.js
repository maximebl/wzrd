const defaultScale = 1;
const defaultRotation = 0;

const initState = {
    scale: {
        x: defaultScale,
        y: defaultScale,
        z: defaultScale
    },
    rotation: {
        x: defaultRotation,
        y: defaultRotation,
        z: defaultRotation
    }
}

const UPDATE_SCALE = 'UPDATE_SCALE';
const UPDATE_ROTATION = 'UPDATE_ROTATION';

export const updateScale = (val) => ({type: UPDATE_SCALE, payload: val});
export const updateRotation = (val) => ({type: UPDATE_ROTATION, payload: val});

export default (state = initState, action) => {
    switch (action.type) {
        case UPDATE_SCALE:
            return {...state, scale: {...state.scale, ...action.payload}}
        case UPDATE_ROTATION:
            return {...state, rotation: {...state.rotation, ...action.payload}}
        default:
            return state
    }
}
