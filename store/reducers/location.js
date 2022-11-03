import {FETCH_NEARBY_LOCATION} from "../actions/location";

const initialState = {
    nearByLocations: null
};


const nearByLocationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEARBY_LOCATION:
            return {
                ...state,
                nearByLocations: [...action.nearByLocations]
            }
        default:
            return state

    }
};

export default nearByLocationsReducer;
