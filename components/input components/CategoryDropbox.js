import React from 'react';
import CustomText from "../CustomText";
import {Picker, StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";


const CategoryDropbox = props => {

    const categories = useSelector(state => state.categories.categories);

    return (
        <View style={styles.dropDown}>
            <CustomText style={styles.customTextStyle}>{props.label}</CustomText>
            <Picker
                selectedValue={props.value}
                style={{
                    flex: 1
                }}
                onValueChange={(itemValue, itemIndex) => props.onChange(itemValue)}
                mode={'dropdown'}
            >
                {categories.map(category=> {
                    return (
                        <Picker.Item key={category.id} label={category.house_category} value={category.id}/>
                    )
                })}
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


export default CategoryDropbox;
