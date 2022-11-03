import {createStackNavigator} from "@react-navigation/stack";
import headerStyles from "./headerStyles";
import LoginScreen from "../screens/auth screens/LoginScreen";
import React from "react";
import ForgotPasswordScreen from "../screens/auth screens/ForgotPasswordScreen";
import CreateUserScreen from "../screens/auth screens/CreateUserScreen";

const Stack = createStackNavigator()
const AuthNavigator = () => {
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
                name={'Login Screen'}
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'Forgot Password Screen'}
                component={ForgotPasswordScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={'Create User Screen'}
                component={CreateUserScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
};


export default AuthNavigator;
