import { CHANGE_PROD_ID } from "./types"

const getFromLS = () => {
    let product = localStorage.getItem('currentProd');
    return product ? product : '';
}

const initialState = {
    id: getFromLS()
}

export const prodReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_PROD_ID:
            return {
                ...state,
                id: payload
            }
        default:
            return state;
    }
}