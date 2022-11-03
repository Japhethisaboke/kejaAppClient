import React from 'react';
import CustomText from "./CustomText";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import Card from "./Card";
import Colors from "../constants/Colors";
import StarRating from "react-native-star-rating";


const OwnerHouseComponent = (props) => {
    const house = props.house;
    const height = useSelector(state => state.uiReducer.height);
    const width = useSelector(state => state.uiReducer.width);
    const orientation = height < width ? 'landscape' : 'portrait';

    const categories = useSelector(state => state.categories.categories);
    let category
    if (categories) {
        category = categories.find(category => house.properties.category === category.id);
    }
    return (
        <Card>
            <TouchableOpacity
                style={{
                    ...styles.container,
                    height: orientation === 'portrait' ? height / 3.3 : height / 1.7,
                    width: orientation === 'portrait' ? width / 1.5 : width / 1.9,
                }}
                onPress={() => {
                    props.navigation.navigate('House Details Screen2',
                        {
                            house: house,
                            fromOwner: true
                        })
                }}
            >
                <View style={{
                    ...styles.imageContainer,
                    height: orientation === 'portrait' ? height / 4.5 : height / 2.3,
                    width: orientation === 'portrait' ? width / 1.5 : width / 1.9,
                }}>
                    <Image
                        source={{uri: house.properties.master_image}}
                        style={{
                            height: '100%',
                            width: '100%'
                        }}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <View>
                        <CustomText style={styles.namePrice}>{house.properties.name}</CustomText>
                        <CustomText style={styles.categoryRating}>{category.house_category}</CustomText>
                    </View>
                    <View>
                        <CustomText style={styles.namePrice}>KES {house.properties.price}</CustomText>

                        <View style={styles.starContainer}>
                            <StarRating
                                disabled={true}
                                emptyStar={'md-star-outline'}
                                fullStar={'md-star'}
                                halfStar={'md-star-half'}
                                iconSet={'Ionicons'}
                                rating={house.properties.average_rating}
                                maxStars={5}
                                fullStarColor={Colors.complementary}
                                emptyStarColor={Colors.complementary}
                                starSize={18}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Card>

    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.mainColorMonochromeLight2,
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 2,
        marginBottom: 10
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '1%'
    },
    namePrice: {
        fontSize: 20,
        color: Colors.mainColor
    },
    categoryRating: {
        color: Colors.mainColor,
        fontSize: 18,
        marginTop: '3%'
    },
    starContainer: {
        marginTop: '5%'
    }
})

export default OwnerHouseComponent;
