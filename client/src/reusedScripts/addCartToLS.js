import { store } from '../index';

export const addCartToLS = () => {
    const stringified = () => {
        return JSON.stringify(store.getState().cart.items)
    }
    localStorage.setItem('cart', stringified())
}