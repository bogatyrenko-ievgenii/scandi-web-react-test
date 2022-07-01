import { configureStore } from '@reduxjs/toolkit';

import { categoryReducer } from './categoryReducer';
import { currencyReducer } from './currencyReducer';
import { prodReducer } from './prodReducer';
import { cartReducer } from './cartReducer';
import { customSelectReducer } from './customSelectReducer';

export const store = configureStore({
    reducer: {
        activeCategory: categoryReducer,
        activeCurrency: currencyReducer,
        activeProd: prodReducer,
        cart: cartReducer,
        customSelects: customSelectReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

store.subscribe(() => {
    const stringified = () => {
        return JSON.stringify(store.getState().cart.items)
    }
    localStorage.setItem('cart', stringified())
})

