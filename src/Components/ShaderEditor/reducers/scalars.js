const ADD_SCALAR = 'ADD_SCALAR';

export const addScalar = (val) => ({type: ADD_SCALAR, payload: val});

export default (state = [], action) => {
    switch (action.type) {
        case ADD_SCALAR:
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}
