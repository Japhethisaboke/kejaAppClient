export const SET_DSTV = 'SET_DSTV';
export const SET_WIFI = 'SET_WIFI';
export const SET_PRICE = 'SET_PRICE';
export const SET_ROOMS = 'SET_ROOMS';

export const setDstvStore = (dstv) => {
    return {type: SET_DSTV, dstv: dstv}
};

export const setWifiStore = (wifi) => {
    return {type: SET_WIFI, wifi: wifi}
};

export const setPriceStore = (low, high) => {
    return {type: SET_PRICE, low: low, high: high}
};

export const setRoomsStore = (low, high) => {
    return {type: SET_ROOMS, low: low, high: high}
};
