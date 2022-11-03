import {FETCH_CATEGORIES} from "../actions/categories";

const initialState = {
    categories: null
}


const categoriesReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_CATEGORIES:
            if (state.categories === null) {
                return {
                    ...state,
                    categories: action.categories
                }
            } else {
                const intersection = state.categories.filter(categories=> action.categories.includes(categories))
                return {
                    ...state,
                    categories: [...new Set([...intersection, ...action.categories])]
                }
            }

        default:
            return state
    }

}


export default categoriesReducer;
