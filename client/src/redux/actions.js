import {
    CHANGE_CATEGORY,
    CHANGE_CURRENCY,
    CHANGE_PROD_ID,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REPLACE_ITEM_PRICE,
    CHANGE_STATUS,
    INCR_QTY_OF_CART_ITEM,
    DECR_QTY_OF_CART_ITEM
} from "./types";
import { getCurrencyByID } from "../graphql/queries/pricesById";
import { store } from "./store";

const cart = store.getState().cart.items;

export function changeCategory(name) {
    return {
        type: CHANGE_CATEGORY,
        payload: name
    }
}

// export const changeCategory = createAction('CHANGE_CATEGORY');
// export const changeCurrency = createAction('CHANGE_CURRENCY');
// export const changeProdId = createAction('CHANGE_PROD_ID');
// export const addToCart = createAction('ADD_TO_CART');
// export const removeFromCart = createAction('REMOVE_FROM_CART');
// export const replaceAllCartItems = createAction(REPLACE_ALL_CART_ITEMS);
// export const replaceItem = createAction('REPLACE_ITEM')


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

export function removeFromCart(item) {
    return {
        type: REMOVE_FROM_CART,
        payload: item
    }
}

// export function replaceAllCartItems(items) {
//     return {
//         type: REPLACE_ALL_CART_ITEMS,
//         payload: items
//     }
// }

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

// export const changeQtyCartItem = (id, type) => (dispatch) => {

//     if (cart.length) {
//         cart.forEach(item => {
//             if (item.id === id) {
//                 if (type === 'incr') {
//                     dispatch(incrQtyCartItem())
//                 }
//             }
//         })
//     }
// }

export const fetchPrices = (currency) => async (dispatch) => {
    const cart = store.getState().cart.items;

    if (cart.length) {
        dispatch(fetchingPriceStatus('loading'));
        await cart.forEach((item, idx) => {
            getCurrencyByID(item.prodId)
                .then(response => {
                    response.data.product.prices.forEach(price => {
                        dispatch(fetchingPriceStatus('idle'));
                        if (price.currency.symbol === currency) {
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