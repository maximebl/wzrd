
const ADD_OUTPUT = 'ADD_OUTPUT';

export const addOutput = (val) => ({type: ADD_OUTPUT, payload: val});

export default (state = [], action) => {
    switch (action.type) {
        case ADD_OUTPUT:
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}
