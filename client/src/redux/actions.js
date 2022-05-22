import { CHANGE_CATEGORY } from "./types";
import { CHANGE_CURRENCY } from "./types";

export function changeCategory(name) {
    return {
        type: CHANGE_CATEGORY,
        payload: name
    }
}

export function changeCurrency(symbol) {
    return {
        type: CHANGE_CURRENCY,
        payload: symbol
    }
}