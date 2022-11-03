import React from 'react';
import {ActivityIndicator, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import CustomText from "./CustomText";
import {FontAwesome} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import Colors from "../constants/Colors";


const ExploreComponent = (props) => {
    const height = useSelector(state => state.uiReducer.height);
    const width = useSelector(state => state.uiReducer.width);
    const house = props.house;
    const categories = useSelector(state => state.categories.categories);
    let category
    if (categories) {
        category = categories.find(category => house.properties.category === category.id);
    }

    const orientation = height > width ? 'portrait' : 'landscape';
    return (
        <View>
            {categories && house ?
                <TouchableOpacity
                    style={{
                        height: orientation === 'portrait' ? height / 4 : height / 2,
                        width: width / 1.6,
                        ...styles.exploreImagesContainer
                    }}
                    onPress={() => {
                        props.navigation.navigate('House Details Screen', {
                            house: house,
                            fromOwner: false
                        })
                    }}
                >
                    <ImageBackground
                        source={{uri: house.properties.master_image}}
                        style={styles.exploreImageBackground}
                    >
                        <View style={{
                            margin: '3%'
                        }}>
                            <View
                                style={styles.exploreCardContents}
                            >
                                <CustomText
                                    style={styles.exploreText}>{house.properties.name}</CustomText>
                                <CustomText
                                    style={styles.exploreText}>KES {house.properties.price}</CustomText>
                            </View>
                            <View
                                style={styles.exploreCardContents}
                            >
                                <CustomText
                                    style={styles.exploreText2}>{category.house_category}</CustomText>
                                <View style={{flexDirection: 'row'}}>
                                    <FontAwesome name={'star'} size={14} color={'gold'}/>
                                    <CustomText
                                        style={styles.exploreText2}>{house.properties.average_rating}/5
                                        Reviews</CustomText>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity> : <View
                    style={{
                        ...styles.spinnerView,
                        height: orientation === 'portrait' ? height / 4 : height / 2,
                        width: width / 1.6,
                    }}
                ><ActivityIndicator size={'large'} color={Colors.mainColor}/></View>}
        </View>
    )
};

const styles = StyleSheet.create({
    exploreImageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    exploreImagesContainer: {
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
        borderRadius: 20,
        overflow: 'hidden'
    },
    exploreText: {
        color: 'white',
        fontSize: 18
    },
    exploreText2: {
        color: 'white',
        fontSize: 14,
        paddingLeft: '1%'
    },
    exploreCardContents: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    spinnerView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
})

export default ExploreComponent;
