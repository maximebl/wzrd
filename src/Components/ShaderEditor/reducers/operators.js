const ADD_OPERATOR = 'ADD_OPERATOR';

export const addOperator = (val) => ({type: ADD_OPERATOR, payload: val});

export default (state = [], action) => {
    switch (action.type) {
        case ADD_OPERATOR:
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}
