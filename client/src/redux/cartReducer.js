import { ADD_TO_CART } from "./types";
import { REMOVE_FROM_CART } from "./types";

const getCartItemsFromLS = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

const initealState = {
    items: getCartItemsFromLS()
}

export const cartReducer = (state = initealState, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            return {
                items: [...state.items, payload]
            }
        case REMOVE_FROM_CART:
            return {
                items: [...state.items.filter((item, idx) => idx !== payload)]
            }
        default:
            return state
    }
}