import { CHANGE_CATEGORY } from "./types";

export function changeCategory(value) {
    return {
        type: CHANGE_CATEGORY,
        payload: value
    }
}