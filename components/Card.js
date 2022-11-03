import React from 'react';
import {StyleSheet, View} from "react-native";


const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    )
}

const styles = StyleSheet.create({
    card: {
        // Work on ios
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        // only these work on android
        backgroundColor: 'white',
        elevation: 10

    }
})

export default Card
