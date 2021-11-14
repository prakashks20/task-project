import actions from "./actions";
const initState = {
    quarter: {
        first: {},
    }
}

export default function quarterReducer(state = initState, action) {
    switch(action.type) {
        case actions.ADD_QUARTER: {
            return{
                ...state,
                quarter: {
                    ...state.quarter,
                    [action.payload.quarter] : action.payload.data,
                }
            }
        }
        default: return state;
    }
}