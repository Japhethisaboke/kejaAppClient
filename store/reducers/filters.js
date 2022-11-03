import React from 'react';
import {SET_DSTV, SET_PRICE, SET_ROOMS, SET_WIFI} from "../actions/filters";

const initialState = {
    dstv: false,
    wifi: false,
    price: {
        low: 4000,
        high: 100000
    },
    rooms: {
        low: 0,
        high: 10
    }
};

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRICE:
            return {
                ...state,
                price: {
                    high: action.high,
                    low: action.low
                }
            }
        case SET_DSTV:
            return {
                ...state,
                dstv: action.dstv
            }
        case SET_WIFI:
            return {
                ...state,
                wifi: action.wifi
            }
        case SET_ROOMS:
            return {
                ...state,
                rooms: {
                    low: action.low,
                    high: action.high
                }
            }
        default:
            return state
    }
};

export default filtersReducer;
