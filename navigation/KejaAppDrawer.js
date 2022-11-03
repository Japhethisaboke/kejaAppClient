import {createDrawerNavigator} from "@react-navigation/drawer";
import React from "react";
import Colors from "../constants/Colors";
import OwnerNavigator from "./OwnerNavigator";
import MainNavigator from "./MainNavigator";


const Drawer = createDrawerNavigator();

const KejaAppDrawer = () => {
    return (
        <Drawer.Navigator
            hideStatusBar={false}
            drawerStyle={{
                marginTop: 30,
                backgroundColor: Colors.backgroundColor
            }}

            drawerContentOptions={{
                activeTintColor: Colors.mainColor,
                inactiveTintColor: Colors.mainColorMonochromeLight,

            }}
        >
            <Drawer.Screen name={'Houses'} component={MainNavigator}/>
            <Drawer.Screen name={'Owner'} component={OwnerNavigator}/>
        </Drawer.Navigator>
    )
}

export default KejaAppDrawer;
