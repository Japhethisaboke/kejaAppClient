import React from 'react';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import vars from "../../env";
import {Dimensions, StyleSheet} from "react-native";
import Colors from "../../constants/Colors";


const Search = (props) => {
    return (
        <GooglePlacesAutocomplete
            placeholder={'Location?'}
            minLength={2}
            autoFocus={true}
            returnKeyType={'search'}
            keyboardAppearance={'light'}
            listViewDisplayed='auto'
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
                const latDelta = details.geometry.viewport.northeast.lat - details.geometry.viewport.southwest.lat;
                props.setCoordinatesHandler(
                    details.geometry.location.lat,
                    details.geometry.location.lng,
                    latDelta
                );
                props.setIsSearchHandler(false);
            }}

            getDefaultValue={() => ''}

            query={{
                key: vars.googleApiKey,
                language: 'en', // language of the results
                types: ''
            }}

            styles={{
                textInputContainer: {
                    backgroundColor: Colors.backgroundColor
                },
                textInput: {
                    width: '100%'
                },
                description: {
                    fontWeight: 'bold',
                },
                separator: {
                    borderColor: Colors.mainColor,
                    marginHorizontal: 5,
                    backgroundColor: Colors.greyMonochromeLight
                },
                predefinedPlacesDescription: {
                    color: '#1faadb'
                },
                container: {
                    opacity: 0.7,
                    ...props.container,
                    borderRadius: 5,
                    overflow: 'hidden',
                    borderColor: Colors.grey
                },
                row: {
                },
                listView: {
                }
            }}

            nearbyPlacesAPI='GooglePlacesSearch'
        />

    )
};
export default Search;
