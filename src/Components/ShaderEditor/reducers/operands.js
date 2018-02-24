import {generateId} from "../../../utils/general";

const defaultState = {
        scalars: [],
        vectorTwos: [],
        vectorThrees: []
}

const ADD_SCALAR = 'ADD_SCALAR';
const ADD_VECTORTWO = 'ADD_VECTORTWO';

export const addScalar = (val) => ({type: ADD_SCALAR, payload: val});
export const addVectorTwo = (val) => ({type: ADD_VECTORTWO, payload: val});

export default (state = defaultState, action) => {
    switch (action.type) {
        case ADD_SCALAR:
            action.payload.id = generateId();
            return Object.assign({}, state, {scalars: [...state.scalars, action.payload]})
        break;

        case ADD_VECTORTWO:
            action.payload.id = generateId();
            return Object.assign({}, state, {vectorTwos: [...state.vectorTwos, action.payload]})
        break;

        default:
            return state
    }
}
