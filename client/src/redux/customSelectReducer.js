import { SHOW_BAG_SELECT, SHOW_CURRENCY_SELECT } from "./types";

const initialState = {
    bagSelect: false,
    currencySelect: false
}

export const customSelectReducer = (state = initialState, { type }) => {
    switch (type) {
        case SHOW_BAG_SELECT:
            return {
                ...state,
                currencySelect: false,
                bagSelect: !state.bagSelect,
            }
        case SHOW_CURRENCY_SELECT:
            return {
                ...state,
                bagSelect: false,
                currencySelect: !state.currencySelect
            }
        default:
            return state;
    }
}
