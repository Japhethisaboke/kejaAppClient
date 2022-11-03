import domain from "../../constants/Domain";

export const FETCH_OWNER = 'FETCH_OWNER';
export const RESET_OWNER = 'RESET_OWNER';

export const fetchOwner = (id) => {
    return async (dispatch) => {

        try {

            const response = await fetch(`${domain}/houses/users/${id}`,
                {
                    method: 'GET'
                })

            const resData = await response.json();

            const owner = resData;
            if (response.status != 200) {
                throw new Error('Something went wrong')
            }

            dispatch({
                type: FETCH_OWNER,
                owner: owner
            })
        } catch (err) {
            return err
        }

    }
};

export const resetOwner = () => {
    return {
        type: RESET_OWNER
    }
};


