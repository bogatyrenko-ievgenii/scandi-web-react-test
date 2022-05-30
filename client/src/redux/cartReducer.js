import { ADD_TO_CART } from "./types";

const initealState = {
    items: []
}

export const cartReducer = (state = initealState, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            return {
                ...state,
                items: [payload]
            }
        default:
            return state
    }
}