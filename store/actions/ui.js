export const SET_DIMENSIONS = 'SET_DIMENSIONS';

export const setDimensions = (myHeight, myWidth) => {
    return {type: SET_DIMENSIONS, height: myHeight, width: myWidth};
};
