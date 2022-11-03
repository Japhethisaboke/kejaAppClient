import {Dimensions} from 'react-native';
import {SET_DIMENSIONS} from "../actions/ui";

const initialState = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DIMENSIONS:
            return {...state, width: action.width, height: action.height};

        default:
            return state;
    }
}

export default uiReducer;
