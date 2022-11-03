import * as Permissions from "expo-permissions";
import {Alert} from "react-native";
import * as Location from "expo-location";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

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

const lastKnownPosition = async () => {
    const hasPermissions = await verifyPermissions()
    if (!hasPermissions) {
        return;
    }

    try {
        const location = await Location.getLastKnownPositionAsync();
        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }

    } catch (err) {
        return err
    }


};


export const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions()
    if (!hasPermissions) {
        return;
    }


    try {
        const location = await Location.getCurrentPositionAsync({
            timeout: 5000,
            accuracy: 6
        });

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }

    } catch (err) {
        await lastKnownPosition();
    }


};


export const signInWithGoogleAsync = async () => {
    try {
        const result = await Google.logInAsync({
            androidClientId: '832140436865-10h4bc3nd2tskh3trsegen8vr5cks313.apps.googleusercontent.com',
            iosClientId: '832140436865-1e5urqs4e4p3b9642opse98l40acv54r.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });

        if (result.type === 'success') {

            return result.accessToken;

        } else {
            return {cancelled: true};
        }
    } catch (err) {
        return {error: true};
    }
}


export const logInFacebook = async () => {
    try {
        await Facebook.initializeAsync('1089568628093051');
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
        });


        if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`);
            const resData = await response.json();
            return token;
        } else {
            return {cancelled: true};
        }
    } catch ({message}) {
        throw new Error(message);
    }
};

export const imageProcessor = (image) => {


    const imageName = image.uri.split('/').pop();
    const imageType = 'image/' + imageName.split('.').pop();

    const pic = {
        name: imageName,
        type: imageType,
        uri: image.uri
    }

    return pic

};



