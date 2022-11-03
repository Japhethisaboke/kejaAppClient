import React from 'react';
import {HeaderButton} from "react-navigation-header-buttons";
import {FontAwesome} from "@expo/vector-icons";
import Colors from "../constants/Colors";



const CustomFontAwesomeHeaderButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={FontAwesome}
            iconSize={23}
            color={Colors.mainColor}
        />
    )
};

export default CustomFontAwesomeHeaderButton;
