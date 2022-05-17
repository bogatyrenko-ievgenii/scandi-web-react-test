import { combineReducers } from "redux"
import { categoryReducer } from './categoryReducer';


export const rootreducer = combineReducers({
    activeCategory: categoryReducer
})