import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import vars from "../../env";


const MapPreviewComponent = (props) => {
    let imagePreviewUrl;

    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat}, ${props.location.lng}&zoom=16&size=400x380&maptype=roadmap&markers=color:red%7Clabel:Location%7C${props.location.lat},${props.location.lng}&key=${vars.googleApiKey}`
    }

    return (

        <TouchableOpacity
            style={{...styles.mapView, ...props.style}}
            onPress={props.onPress}
        >
            {props.location && !props.fetching ?
                <Image style={styles.maps} source={{uri: imagePreviewUrl}}/> : props.children}
        </TouchableOpacity>

    )


};


const styles = StyleSheet.create({
    maps: {
        height: '100%',
        width: '100%',
    },
    mapView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1%',
    }
});


export default MapPreviewComponent;
