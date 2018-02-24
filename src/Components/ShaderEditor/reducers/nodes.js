
const ADD_NODE = 'ADD_NODE';

export const addNode = (val) => ({type: ADD_NODE, payload: val});

export default (state = [], action) => {
    switch (action.type) {
        case ADD_NODE:
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}
