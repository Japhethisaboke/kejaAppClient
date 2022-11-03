import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HouseDetailScreen from "../screens/HouseDetailsScreen";
import headerStyles from "./headerStyles";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import {FontAwesome5} from "@expo/vector-icons";
import SingleHouseMapScreen from "../screens/SingleHouseMapScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen";


const Stack = createStackNavigator();


const MainNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: headerStyles.headerStyles,
                headerTitleAlign: 'center',
                headerTitleStyle: headerStyles.headerTitleStyle
            }}
            headerMode={'float'}

        >
            <Stack.Screen
                name='Home Screen'
                component={HomeScreen}
                options={{
                    headerShown: false,
                }}

            />

            <Stack.Screen
                name="Map Screen"
                component={MapScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: (tabInfo) => {
                        return <FontAwesome5
                            name={"map-marker-alt"}
                            size={20}
                            color={tabInfo.color}/>
                    }
                }}
            />
            <Stack.Screen name='House Details Screen' component={HouseDetailScreen}
                          options={{
                              headerShown: false,
                          }}
            />
            <Stack.Screen name='Single House Map Screen' component={SingleHouseMapScreen}
                          options={{
                              headerShown: false,
                          }}
            />
            <Stack.Screen name='User Detail Screen' component={UserDetailsScreen}
                          options={{
                              headerShown: false,
                          }}
            />
            <Stack.Screen name='House Details Screen2' component={HouseDetailScreen}
                          options={{
                              headerShown: false,
                          }}
            />
        </Stack.Navigator>
    )
};

export default MainNavigator;
