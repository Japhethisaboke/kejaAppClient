import vars from "../../env";

export const FETCH_NEARBY_LOCATION = 'FETCH_NEARBY_LOCATION';

export const fetchNearbyLocations = (lat, lng) => {
    return async (dispatch) => {
        let nearbyLocations;
        let nearbyLocationsShortened;
        const nearByLocationsRefined = [];
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=regions&key=${vars.googleApiKey}`,
                {
                    method: 'GET'
                });

            const resData = await response.json();


            if (response.status != 200) {
                throw new Error('Something went wrong')
            }

            nearbyLocations = resData;
            nearbyLocationsShortened = [...nearbyLocations.results.slice(0,6)];
            nearbyLocationsShortened.forEach(location => {
                nearByLocationsRefined.push({
                    id: location.id,
                    name: location.name,
                    geometry: location.geometry
                })
            });

            dispatch({
                type: FETCH_NEARBY_LOCATION,
                nearByLocations: nearByLocationsRefined
            });
        } catch (err) {
            return err
        }
        ;


    }
};
