import React, {useState} from 'react';
import {ActivityIndicator, Alert, Button, StyleSheet, View} from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapPreviewComponent from "./MapPreviewComponents";
import CustomText from "../CustomText";
import Colors from "../../constants/Colors";
import {useSelector} from "react-redux";
import MapView from "react-native-maps";

const LocationPicker = props => {

    const height = useSelector(state => state.uiReducer.height);
    const width = useSelector(state => state.uiReducer.width);
    const orientation = height < width ? 'landscape' : 'portrait';

    const [mapViewVisibility, setMapViewVisibility] = useState(false);


    const [isFetching, setIsFetching] = useState(false);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);

        if (result.status != 'granted') {
            Alert.alert(
                'Insufficient permissions',
                'You need to grant location permissions'
            );
            return false
        }
        return true
    };

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions()
        if (!hasPermissions) {
            return;
        }


        try {
            setIsFetching(true);

            const location = await Location.getCurrentPositionAsync({
                timeout: 5000,
            });
            props.setLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert('Error!', "Something went wrong.")
        }
        setIsFetching(false);


    };

    const selectOnMapLocationHandler = () => {
        setMapViewVisibility(true);
    };


    return (
        <View style={styles.locationPicker}>
            <MapPreviewComponent
                location={props.location}
                fetching={isFetching}
                style={{
                    height: orientation === 'portrait' ? height / 2 : height / 1.5,
                    width: width,
                    margin: '1%'
                }}
            >
                {isFetching ? <ActivityIndicator size='large' color={Colors.secondary}/> :
                    <CustomText>No Location Selected</CustomText>}
            </MapPreviewComponent>
            <View style={styles.buttonStyles}>
                <Button title='Get Current Location' color={Colors.secondary} onPress={getLocationHandler}/>
                <Button title='Pick On Map' color={Colors.secondary} onPress={selectOnMapLocationHandler}/>
            </View>

            {mapViewVisibility &&
            <MapView
                initialRegion={{
                    latitude: 0.1768696,
                    longitude: 37.9083264,
                    latitudeDelta: 9.75772089,
                    longitudeDelta: 0.9
                }}
                style={{...StyleSheet.absoluteFillObject, elevation: 100}}
                onPress={(event) => {
                    props.setLocation({
                        lat: event.nativeEvent.coordinate.latitude,
                        lng: event.nativeEvent.coordinate.longitude
                    });
                    setMapViewVisibility(false)
                }}
            />
            }

        </View>
    )
};


const styles = StyleSheet.create({
    locationPicker: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1%'
    },
    buttonStyles: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%'
    }

});

export default LocationPicker;
