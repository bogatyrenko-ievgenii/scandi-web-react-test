import { CHANGE_CURRENCY } from "./types";

const getCurrencyFormLS = () => {
    let currency = localStorage.getItem('currency');
    return currency ? currency : '$';
}

const initialState = {
    symbol: getCurrencyFormLS()
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