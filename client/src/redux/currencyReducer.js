import { CHANGE_CURRENCY } from "./types";

const initialState = {
    symbol: '$'
}

export const currencyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_CURRENCY:
            return {
                ...state,
                symbol: payload
            }
        default:
            return state;
    }
}