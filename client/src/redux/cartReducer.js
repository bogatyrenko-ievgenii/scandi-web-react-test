import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    REPLACE_ITEM_PRICE,
    CHANGE_STATUS,
    INCR_QTY_OF_CART_ITEM,
    DECR_QTY_OF_CART_ITEM,
    CHANGE_ATTRIBUTE,
    GET_TOTAL_COUNT,
    GET_QTY_ITEMS_IN_CART
} from "./types";

const getCartItemsFromLS = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

const initialState = {
    items: getCartItemsFromLS(),
    itemsQty: 0,
    totalCount: 0,
    loadingStatus: 'idle'
}


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
                items: [...state.items.filter(item => item.id !== payload)]
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
                        : { ...item, qty: item.qty >= 1 ? item.qty - 1 : item.qty }
                })
            }
        case CHANGE_ATTRIBUTE:
            return {
                ...state,
                items: state.items.map(item => {
                    return item.id !== payload.id
                        ? item
                        : { ...item, items: { ...item.items, [payload.name]: payload.value } }
                })
            }
        case GET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: state.items.reduce((prev, current) => {
                    return prev + current.qty * current.activePrice
                }, 0)
            }
        case GET_QTY_ITEMS_IN_CART:
            return {
                ...state,
                itemsQty: state.items.reduce((prev, current) => {
                    return prev + current.qty
                }, 0)
            }
        default:
            return state
    }
}