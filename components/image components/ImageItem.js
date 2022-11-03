import React from 'react';
import {Image, StyleSheet, View} from "react-native";


const ImageItem = (props) => {
    return (
        <View style={styles.imageContainer} key={props.index}>
            <Image source={{uri: props.image.uri}} style={styles.imageStyle}></Image>
        </View>
    )
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        padding: '1%',
        overflow: 'hidden'
    },
    imageStyle: {
        height: '100%',
        width: '100%'
    }
})

export default ImageItem;
