import { CHANGE_CATEGORY } from "./types";
import { CHANGE_CURRENCY } from "./types";
import { CHANGE_PROD_ID } from './types'

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

export function changeProdId(id) {
    return {
        type: CHANGE_PROD_ID,
        payload: id
    }

}