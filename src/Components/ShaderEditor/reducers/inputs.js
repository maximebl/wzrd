
export const ADD_INPUT = 'ADD_INPUT';
export const UPDATE_STORE_INPUTS = 'UPDATE_STORE_INPUTS';

export const addInput = (val) => ({type: ADD_INPUT, payload: val});



export default (state = [], action) => {
    switch (action.type) {
        case ADD_INPUT:
            return [
                ...state,
                action.payload
            ]
        case UPDATE_STORE_INPUTS:
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}
