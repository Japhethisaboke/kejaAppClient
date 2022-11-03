import React from "react";
import {useSelector} from "react-redux";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";

import {Ionicons} from "@expo/vector-icons";


const ImageTile = (props) => {
    const width = useSelector(state => state.uiReducer.width);
    if (!props.item) return null
    return (
        <TouchableOpacity
            style={{opacity: props.selected ? 0.7 : 1}}
            underlayColor="transparent"
            onPress={() => props.selectImage(props.index)}
        >
            <View>
                <Image
                    style={{width: width / 4 - 6, height: width / 4, margin: 3}}
                    source={{uri: props.item}}
                />

                {props.selected ? (
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 3,
                            right: 7,
                        }}
                    >
                        <Ionicons name="md-checkmark-circle" size={25} color="blue"/>
                    </View>
                ) : null}
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({})

export default ImageTile;
