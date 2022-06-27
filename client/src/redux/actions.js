import {
    CHANGE_CATEGORY,
    CHANGE_CURRENCY,
    CHANGE_PROD_ID,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REPLACE_ITEM_PRICE,
    CHANGE_STATUS,
    INCR_QTY_OF_CART_ITEM,
    DECR_QTY_OF_CART_ITEM,
    CHANGE_ATTRIBUTE,
    GET_TOTAL_COUNT
} from "./types";
import { getCurrencyByID } from "../graphql/queries/pricesById";
import { store } from "./store";

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

export function addToCart(item) {
    return {
        type: ADD_TO_CART,
        payload: item
    }
}

export function removeFromCart(id) {
    return {
        type: REMOVE_FROM_CART,
        payload: id
    }
}

export function replaceItemPrice(payload) {
    return {
        type: REPLACE_ITEM_PRICE,
        payload,
    }
}

export function fetchingPriceStatus(status) {
    return {
        type: CHANGE_STATUS,
        payload: status
    }
}

export function incrQtyCartItem(id) {
    return {
        type: INCR_QTY_OF_CART_ITEM,
        payload: id
    }
}

export function decrQtyCartItem(id) {
    return {
        type: DECR_QTY_OF_CART_ITEM,
        payload: id
    }
}

export function changeAttribute(payload) {
    return {
        type: CHANGE_ATTRIBUTE,
        payload
    }
}

export function getTotalCount() {
    return { type: GET_TOTAL_COUNT }
}

export const fetchPrices = (currency) => async (dispatch) => {
    const cart = store.getState().cart.items;

    if (cart.length) {
        dispatch(fetchingPriceStatus('loading'));
        await cart.forEach((item, idx) => {
            getCurrencyByID(item.prodId)
                .then(response => {
                    response.data.product.prices.forEach(price => {
                        if (price.currency.symbol === currency) {
                            dispatch(fetchingPriceStatus('idle'));
                            const item = cart[idx];
                            dispatch(replaceItemPrice({ id: item.id, newPrice: price.amount }))
                        }
                    })
                })
                .catch(() => {
                    dispatch(fetchingPriceStatus('error'));
                })
        })
    }
}