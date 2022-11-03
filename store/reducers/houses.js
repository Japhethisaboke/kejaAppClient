import {
    FETCH_HOUSES,
    FETCH_HOUSES_CATEGORY,
    FETCH_HOUSES_RANDOM,
    FETCH_HOUSES_SHUFFLE, FETCH_OWNER_HOUSES, RESET_OWNER_HOUSE,
    SET_CATEGORY_HOUSE_FILTERS,
    SET_HOUSE_FILTERS
} from "../actions/houses";

const initialState = {
    houses: null,
    housesCategory: null,
    filteredHouses: null,
    filteredCategoryHouses: null,
    housesRandom: null,
    shuffledHouses: null,
    ownerHouses: null
}


const housesReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_HOUSES:
            const filteredHouses = filterMethod(action.houses, action.filters);
            if (state.houses === null) {
                return {
                    ...state,
                    houses: action.houses,
                    filteredHouses: filteredHouses
                }
            } else {
                const intersection = state.houses.filter(house => action.houses.includes(house))
                return {
                    ...state,
                    houses: [...new Set([...intersection, ...action.houses])],
                    filteredHouses: filteredHouses
                }
            }
        case FETCH_HOUSES_CATEGORY:
            const filteredHouseCategory = filterMethod(action.houses, action.filters);
            return {
                ...state,
                housesCategory: action.houses,
                filteredCategoryHouses: filteredHouseCategory
            }

        case FETCH_HOUSES_RANDOM:
            return {
                ...state,
                housesRandom: action.houses
            }

        case SET_HOUSE_FILTERS:
            const filterHouses = filterMethod(action.houses, action.filters);
            return {
                ...state,
                filteredHouses: filterHouses,

            }

        case SET_CATEGORY_HOUSE_FILTERS:
            const filterCategoryHouses = filterMethod(action.houses, action.filters);
            return {
                ...state,
                filteredCategoryHouses: filterCategoryHouses
            }

        case FETCH_HOUSES_SHUFFLE:
            return {
                ...state,
                shuffledHouses: action.houses
            }

        case FETCH_OWNER_HOUSES:
            return {
                ...state,
                ownerHouses: action.houses
            }
        case RESET_OWNER_HOUSE:
            return  {
                ...state,
                ownerHouses: null
            }

        default:
            return state
    }

}


const filterMethod = (houses, filters) => {
    const dstv = filters.dstv;
    const wifi = filters.wifi;
    const price = filters.price;
    const rooms = filters.rooms;

    const filteredHouses = houses.filter((house) => {
        if (dstv && !house.properties.amenities.dstv) {
            return false
        }
        if (wifi && !house.properties.amenities.wifi) {
            return false
        }
        if (house.properties.price < price.low || house.properties.price > price.high) {
            return false
        }
        if (house.properties.rooms < rooms.low || house.properties.rooms > rooms.high) {
            return false
        }
        return true
    });
    return filteredHouses;
};


export default housesReducer;
