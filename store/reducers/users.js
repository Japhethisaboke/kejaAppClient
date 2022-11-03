import {FETCH_OWNER, RESET_OWNER} from "../actions/users";

const initialState = {
    owner: null
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OWNER:
            return {
                ...state,
                owner: action.owner
            }

        case RESET_OWNER:
            return {
                ...state,
                owner: null
            }

        default:
            return state
    }
};

export default usersReducer;
