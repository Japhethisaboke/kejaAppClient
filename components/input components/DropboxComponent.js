import React from 'react';
import CustomText from "../CustomText";
import {Picker, StyleSheet, View} from "react-native";


const DropboxComponent = props => {
    return (
        <View style={styles.dropDown}>
            <CustomText style={styles.customTextStyle}>{props.label}</CustomText>
            <Picker
                selectedValue={props.value}
                style={{
                    flex: 1
                }}
                onValueChange={(itemValue, itemIndex) => {
                    props.onChange(itemValue);
                }}
                mode={'dropdown'}
            >
                <Picker.Item label={'True'} value={true}/>
                <Picker.Item label={'False'} value={false}/>
            </Picker>
        </View>
    )
};

const styles = StyleSheet.create({
    dropDown: {
        flexDirection: 'row',
        marginRight: '15%',
        marginLeft: '1%'
    },
    customTextStyle: {
        fontSize: 20,
        paddingTop: 15,
        flex: 1
    }
})


export default DropboxComponent;
