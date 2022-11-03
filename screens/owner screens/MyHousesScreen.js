import React from 'react';
import {Alert, Text, View} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButtons";
import CustomFontAwesomeHeaderButton from "../../components/CustomFontAwesomeHeaderButton";


const MyHousesScreen = props => {



        props.navigation.setOptions({
            title: 'My Houses',
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title={'Menu'}
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() => {
                            props.navigation.openDrawer()
                        }}/>
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomFontAwesomeHeaderButton}>
                    <Item
                        title={'Menu'}
                        iconName={'edit'}
                        onPress={() => {
                            props.navigation.navigate('New House Screen');
                        }}/>
                </HeaderButtons>
            )
        });
        return (
            <View><Text>Ngori</Text></View>
        )
    }
;


export default MyHousesScreen;
