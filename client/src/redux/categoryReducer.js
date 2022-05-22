import { CHANGE_CATEGORY } from './types';

const initialState = {
    name: 'all',
}

export const categoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_CATEGORY:
            return {
                ...state,
                name: payload
            }
        default:
            return state;
    }
}