import { combineReducers } from "redux"
import { categoryReducer } from './categoryReducer';
import { currencyReducer } from './currencyReducer';
import { prodReducer } from './prodReducer';
import { cartReducer } from './cartReducer';

export const rootreducer = combineReducers({
    activeCategory: categoryReducer,
    activeCurrency: currencyReducer,
    activeProd: prodReducer,
    cart: cartReducer,
})