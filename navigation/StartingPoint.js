import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from "react-native";
import {NavigationContainer} from '@react-navigation/native'
import {setDimensions} from "../store/actions/ui";
import {useDispatch} from "react-redux";
import {Dimensions} from 'react-native'
import KejaAppDrawer from "./KejaAppDrawer";
import AuthNavigator from "./AuthNavigator";



const StartingPoint = props => {

    const dispatch = useDispatch();

    const updateLayout = useCallback(() => {
        dispatch(setDimensions(
            Dimensions.get('window').height,
            Dimensions.get('window').width
        ))
    }, [dispatch]);

    useEffect(() => {
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        };
    })

    return (
        <NavigationContainer>
           <KejaAppDrawer/>
           {/*<AuthNavigator/>*/}
        </NavigationContainer>
    )

};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})


export default StartingPoint;
