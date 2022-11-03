import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import headerStyles from "./headerStyles";
import NewHouseScreen from "../screens/owner screens/NewHouseScreen";
import MyHousesScreen from "../screens/owner screens/MyHousesScreen";


const Stack = createStackNavigator();

const OwnerNavigator = props => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: headerStyles.headerStyles,
                headerTitleAlign: 'center',
                headerTitleStyle: headerStyles.headerTitleStyle
            }}
        >
            <Stack.Screen name={'My Houses Screen'} component={MyHousesScreen}/>
            <Stack.Screen name={'New House Screen'} component={NewHouseScreen}/>
        </Stack.Navigator>
    )
}

export default OwnerNavigator;
