import { CHANGE_CATEGORY } from './types';
// import { changeCategory } from './actions';


const initialState = {
    idx: 0,
}

export const categoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_CATEGORY:
            return {
                ...state,
                idx: payload
            }
        default:
            return state;
    }
}