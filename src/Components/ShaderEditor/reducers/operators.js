import {generateId} from "../../../utils/general";

const defaultState = {
    additions: []
}

const ADD_ADDITION = 'ADD_ADDITION';

export const addAddition = (val) => ({type: ADD_ADDITION, payload: val});

export default (state = defaultState, action) => {
    switch (action.type) {
        case ADD_ADDITION:
            action.payload.id = generateId();
            return Object.assign({}, state, {additions: [...state.additions, action.payload]})
        break;

        default:
            return state
    }
}
