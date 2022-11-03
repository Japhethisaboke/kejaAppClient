import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import * as Permissions from "expo-permissions";
import * as ImagePicker from 'expo-image-picker';
import {FontAwesome5} from "@expo/vector-icons";


const ImageSelector = props => {
    const verifyPermissionsUseCamera = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);

        if (result.status != 'granted') {
            Alert.alert(
                'Insufficient permissions',
                'You need to grant camera permissions'
            );
            return false
        }
        return true
    };

    const verifyPermissionsGoToGallery = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (result.status != 'granted') {
            Alert.alert(
                'Insufficient permissions',
                'You need to grant camera permissions'
            );
            return false
        }
        return true
    };

    const takeImageHandler = async () => {

        const hasPermission = await verifyPermissionsUseCamera();

        if (!hasPermission) {
            return
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.8
        })

        if (image.uri !== undefined) {
            props.setImage(image);
        }
    };
    const selectImageFromGallery = async () => {
        const hasPermission = await verifyPermissionsGoToGallery();

        if (!hasPermission) {
            return
        }

        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.8,
            allowsMultipleSelection: true
        })

        if (image.uri !== undefined) {
            props.setImage(image);
        }
    };


    return (
        <View style={styles.pickerContainer}>
            <TouchableOpacity
                onPress={takeImageHandler}
                style={styles.opacityContainer}
            >
                <FontAwesome5 name={"camera"} size={16} color={'white'}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={selectImageFromGallery}
                style={styles.opacityContainer}
            >
                <FontAwesome5 name={"image"} size={16} color={'white'}/>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    pickerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    textStyle: {
        color: 'white'
    },
    opacityContainer: {
        backgroundColor: Colors.mainColor,
        flex: 1,
        marginHorizontal: '10%',
        marginVertical: '2%',
        padding: '2%',
        alignItems: 'center',
        borderRadius: 10
    }
})


export default ImageSelector;
