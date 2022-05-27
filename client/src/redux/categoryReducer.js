import { CHANGE_CATEGORY } from './types';

const removeSlash = (text) => {
    const re = /^\/\w+$/i;
    return !re.test(text) ? 'all' : text.slice(1)
}


const initialState = {
    name: removeSlash(document.location.pathname),
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