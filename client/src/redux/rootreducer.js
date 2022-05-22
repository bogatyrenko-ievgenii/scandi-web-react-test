import { combineReducers } from "redux"
import { categoryReducer } from './categoryReducer';
import { currencyReducer } from './currencyReducer';


export const rootreducer = combineReducers({
    activeCategory: categoryReducer,
    activeCurrency: currencyReducer,
})