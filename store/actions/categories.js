import domain from "../../constants/Domain";


export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';


export const fetchCategories = () => {
    return async (dispatch) => {
        let categories;
        try {
            const response = await fetch(`${domain}/houses/categories`,
                {
                    method: 'GET'
                });

            const resData = await response.json();
            categories = resData;

            if (response.status != 200) {
                throw new Error('Something went wrong')
            }
            dispatch({
                type: FETCH_CATEGORIES,
                categories: categories
            });
        } catch (err) {
            return err
        }
        ;


    }
};
