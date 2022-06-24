import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REPLACE_ITEM_PRICE,
    CHANGE_STATUS,
    INCR_QTY_OF_CART_ITEM,
    DECR_QTY_OF_CART_ITEM
} from "./types";
// import { createReducer } from "@reduxjs/toolkit";
// import { replaceAllCartItems, removeFromCart, addToCart, replaceItem } from './actions'

const getCartItemsFromLS = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

const initialState = {
    items: getCartItemsFromLS(),
    loadingStatus: 'idle'
}

// Reducer was created without using Immer.

// export const cartReducer = createReducer(initialState, builder => {
//     builder
//         .addCase(addToCart, (state, action) => ({
//             ...state,
//             items: [...state.items, action.payload]
//         }))
//         .addCase(removeFromCart, (state, action) => ({
//             ...state,
//             items: state.items.filter((item, idx) => idx !== action.payload)
//         }))
//         .addCase(replaceItem, (state, action) => ({
//             ...state,
//             items: state.items.map(item => {
//                 return item.id !== action.payload.id
//                     ? item
//                     : { ...item, activePrice: action.payload.newPrice }
//             })
//         }))
//         .addDefaultCase(() => { });
// })

export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            return {
                ...state,
                items: [...state.items, payload]
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                items: [...state.items.filter((item, idx) => idx !== payload)]
            }
        case REPLACE_ITEM_PRICE:
            return {
                ...state,
                items: state.items.map(item => {
                    return item.id !== payload.id
                        ? item
                        : { ...item, activePrice: payload.newPrice }
                })
            }
        case CHANGE_STATUS:
            return {
                ...state,
                loadingStatus: payload
            }
        case INCR_QTY_OF_CART_ITEM:
            return {
                ...state,
                items: state.items.map(item => {
                    return item.id !== payload
                        ? item
                        : { ...item, qty: item.qty + 1 }
                })
            }
        case DECR_QTY_OF_CART_ITEM:
            return {
                ...state,
                items: state.items.map(item => {
                    return item.id !== payload
                        ? item
                        : { ...item, qty: item.qty - 1 }
                })
            }
        default:
            return state
    }
}