import React from 'react';


import StartingPoint from "./navigation/StartingPoint";
import {applyMiddleware, combineReducers, createStore} from "redux";
import housesReducer from "./store/reducers/houses";
import ReduxThunk from 'redux-thunk';
import {Provider} from "react-redux";
import {enableScreens} from "react-native-screens";
import uiReducer from "./store/reducers/ui";
import categoriesReducer from "./store/reducers/categories";
import nearByLocationsReducer from "./store/reducers/location";
import {composeWithDevTools}  from 'redux-devtools-extension'
import filtersReducer from "./store/reducers/filters";
import usersReducer from "./store/reducers/users";


const rootReducer = combineReducers({
    houses: housesReducer,
    uiReducer: uiReducer,
    categories: categoriesReducer,
    nearByLocations: nearByLocationsReducer,
    filtersReducer: filtersReducer,
    usersReducer: usersReducer
});

enableScreens();

const store = createStore(rootReducer, composeWithDevTools (applyMiddleware(ReduxThunk)))

export default function App() {
    return (
        <Provider store={store}>
            <StartingPoint/>
        </Provider>
    );
}
