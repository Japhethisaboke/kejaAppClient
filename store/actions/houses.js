import {objectToFormData} from "object-to-formdata";
import domain from "../../constants/Domain";
import {imageProcessor} from "../../utilities/utilities";

export const FETCH_HOUSES = 'FETCH_HOUSES';
export const FETCH_OWNER_HOUSES = 'FETCH_OWNER_HOUSES';
export const FETCH_HOUSES_CATEGORY = 'FETCH_HOUSES_CATEGORY';
export const FETCH_HOUSES_RANDOM = 'FETCH_HOUSES_RANDOM';
export const FETCH_HOUSES_SHUFFLE = 'FETCH_HOUSES_SHUFFLE';
export const SET_HOUSE_FILTERS = 'SET_HOUSE_FILTERS';
export const SET_CATEGORY_HOUSE_FILTERS = 'SET_CATEGORY_HOUSE_FILTERS';
export const RESET_OWNER_HOUSE = 'RESET_OWNER_HOUSE';





export const fetchHouses = (filters) => {
    return async (dispatch) => {
        let houses;
        try {

            const response = await fetch(`${domain}/houses/all_houses`,
                {
                    method: 'GET'
                })

            const resData = await response.json();

            houses = resData.features;

            if (response.status != 200) {
                throw new Error('Something went wrong')
            }

            dispatch({
                type: FETCH_HOUSES,
                houses: houses,
                filters: filters
            })
        } catch (err) {
            return err
        }

    }
};

export const createHouse = (name, category, rooms, price, location, wifi, dstv, images) => {
    const owner = 1;
    const myObj = {
        name: name,
        category: category,
        price: price,
        owner: owner
    };

    const pic = imageProcessor(images[0]);
    const formData = objectToFormData(myObj);

    formData.append("master_image", pic, pic.name);
    formData.append("location", `{\n        \"type\": \"Point\",\n        \"coordinates\": [\n            ${location.lng},\n            ${location.lat}\n        ]\n    }`);
    formData.append("amenities", `{\"dstv\": ${dstv}, \"wifi\": ${wifi}}`);

    const imagesFormData = new FormData();
    images.map((image, index) => {
        const imagePic = imageProcessor(image);
        imagesFormData.append("image" + index, imagePic, imagePic.name);
    })

    return async (dispatch) => {
        try {
            const response = await fetch(`${domain}/houses/create_house`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })

            if (response.status != 201) {
                throw new Error("Something went wrong");
            }

            const resData = await response.json();
            const newHouseId = resData['id']

            imagesFormData.append("houseId", newHouseId);

            try {
                const response = await fetch(`${domain}/houses/house_images`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: imagesFormData
                });
                if (response.status != 201) {
                    throw new Error("Something went wrong");
                }
            } catch (err) {
                throw err;
            }

        } catch (err) {
            throw err;
        }

    }
};




export const fetchHousesCategory = (id, filters) => {
    return async (dispatch) => {
        let houses;
        try {

            const response = await fetch(`${domain}/houses/all_houses/categories/${id}`,
                {
                    method: 'GET'
                })

            const resData = await response.json();

            houses = resData.features;

            if (response.status != 200) {
                throw new Error('Something went wrong')
            }

            dispatch({
                type: FETCH_HOUSES_CATEGORY,
                houses: houses,
                filters: filters
            })
        } catch (err) {
            return err
        }

    }
};

export const fetchHousesRandom = () => {
    return async (dispatch) => {
        let houses;
        try {

            const response = await fetch(`${domain}/houses/all_houses/random`,
                {
                    method: 'GET'
                })

            const resData = await response.json();

            houses = resData.features;

            if (response.status != 200) {
                throw new Error('Something went wrong')
            }

            dispatch({
                type: FETCH_HOUSES_RANDOM,
                houses: houses
            })
        } catch (err) {
            return err
        }

    }
};

export const fetchHousesShuffle = () => {
    return async (dispatch) => {
        let houses;
        try {

            const response = await fetch(`${domain}/houses/shuffled_houses`,
                {
                    method: 'GET'
                })

            const resData = await response.json();

            houses = resData.features;

            if (response.status != 200) {
                throw new Error('Something went wrong')
            }

            dispatch({
                type: FETCH_HOUSES_SHUFFLE,
                houses: houses
            })
        } catch (err) {
            return err
        }

    }
};

export const fetchOwnerHouse = (id) => {
    return async (dispatch) => {
        let houses;
        try {

            const response = await fetch(`${domain}/houses/houses/${id}`,
                {
                    method: 'GET'
                })

            const resData = await response.json();

            houses = resData.features;

            if (response.status != 200) {
                throw new Error('Something went wrong')
            }

            dispatch({
                type: FETCH_OWNER_HOUSES,
                houses: houses
            })
        } catch (err) {
            return err
        }

    }
};


export const resetOwnerHouses = () => {
    return {
        type: RESET_OWNER_HOUSE
    }
};


export const setHouseFilters = (houses, filters) => {
    return {
        type: SET_HOUSE_FILTERS,
        filters: filters,
        houses: houses
    }
};

export const setCategoryHouseFilters = (houses, filters) => {
    return {
        type: SET_CATEGORY_HOUSE_FILTERS,
        filters: filters,
        houses: houses
    }
};


