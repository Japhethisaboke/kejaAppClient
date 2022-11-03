import React, {useCallback, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    ImageBackground,
    RefreshControl,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Colors from "../constants/Colors";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import CustomText from "../components/CustomText";
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {fetchHousesRandom, fetchHousesShuffle} from "../store/actions/houses";
import {fetchCategories} from "../store/actions/categories";
import {fetchNearbyLocations} from "../store/actions/location";
import MyImageSlider from "../components/MyImageSlider";
import {getLocationHandler} from "../utilities/utilities";
import ExploreComponent from "../components/ExploreComponent";


const HomeScreen = props => {
    const height = useSelector(state => state.uiReducer.height);
    const width = useSelector(state => state.uiReducer.width);

    const houses = useSelector(state => state.houses.housesRandom);
    const shuffleHouses = useSelector(state => state.houses.shuffledHouses);
    const houseMasterImages = [];

    const nearByLocations = useSelector(state => state.nearByLocations.nearByLocations);


    const dispatch = useDispatch();
    const [currentImage, setCurrentImage] = useState(houseMasterImages[0]);
    const [refreshing, setRefreshing] = React.useState(false);

    const categories = useSelector(state => state.categories.categories);

    const orientation = height > width ? 'portrait' : 'landscape';


    const fetchCategoriesScreen = useCallback(async () => {
        try {
            await dispatch(fetchCategories());
        } catch (err) {
            Alert.alert('Error', err.message)
        }
    }, [dispatch]);

    const fetchHousesScreen = useCallback(async () => {
        try {
            await dispatch(fetchHousesRandom());
        } catch (err) {
            Alert.alert('Error', 'An error occurred.')
        }
    }, [dispatch]);

    const fetchHousesShuffleScreen = useCallback(async () => {
        try {
            await dispatch(fetchHousesShuffle());
        } catch (err) {
            Alert.alert('Error', 'An error occurred.')
        }
    }, [dispatch]);

    if (houses) {
        houses.map(house => {
            houseMasterImages.push(house.properties.master_image)
        });
    }
    ;

    const fetchNearbyLocationsScreen = useCallback(async () => {
        try {
            const {latitude, longitude} = await getLocationHandler();
            await dispatch(fetchNearbyLocations(latitude, longitude));
        } catch (err) {
            return err
        }
        ;
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchHousesScreen();
        await fetchCategoriesScreen();
        await fetchHousesShuffleScreen();
        await fetchNearbyLocationsScreen().catch(err => {
            Alert.alert("Couldn't fetch your location", 'Make sure your GPS and data are turned on');
        });
        setRefreshing(false);
    };

    useEffect(() => {
        // const unsubscribe = props.navigation.addListener('focus', () => {
        //
        // });
        // return (() => {
        //     unsubscribe();
        // })
        fetchHousesScreen();
        fetchCategoriesScreen();
        fetchHousesShuffleScreen();
        fetchNearbyLocationsScreen().catch(err => {
            Alert.alert("Couldn't fetch your location", 'Make sure your GPS and data are turned on');
        });

    }, []);


    return (
        <View style={styles.screen}>
            {houses && shuffleHouses ?
                <View style={{flex: 1}}>
                    <View style={styles.menuSearchContainer}>
                        <Card style={{
                            ...styles.searchCard,
                            height: orientation === 'portrait' ? height / 20 : height / 10
                        }}>
                            <View style={styles.searchContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate('Map Screen', {
                                            nearByLocation: null,
                                            category: null
                                        })
                                    }}
                                    style={styles.searchOpacity}>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
                                        size={25} color={Colors.mainColor}
                                    />
                                </TouchableOpacity>
                                <TextInput
                                    style={{
                                        ...styles.searchInput,
                                        height: orientation === 'portrait' ? height / 20 : height / 10
                                    }}
                                    placeholder={'Location?'}
                                    onFocus={() => {
                                        props.navigation.navigate('Map Screen', {
                                            nearByLocation: null,
                                            category: null
                                        })
                                    }}
                                />
                            </View>
                        </Card>
                        <View style={styles.menuContainer}>
                            <TouchableOpacity
                                style={styles.menuTouchableOpacity}
                                onPress={() => {
                                    props.navigation.openDrawer()
                                }}
                            >
                                <Ionicons name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} size={35}
                                          color={Colors.mainColor}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView
                        style={{flex: 1}}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={[Colors.mainColor, Colors.complementary]}
                            />
                        }
                    >
                        <View>
                            <Card style={{
                                ...styles.sliderCard,
                                height: orientation === 'portrait' ? height / 4.3 : height / 2.5,

                            }}>
                                <MyImageSlider
                                    images={houseMasterImages}
                                    sliderBoxHeight={'100%'}

                                    onCurrentImagePressed={(index) => {
                                        props.navigation.navigate('House Details Screen', {
                                            house: houses[index],
                                            fromOwner: false
                                        })
                                    }}

                                    currentImageEmitter={(index) => {
                                        setCurrentImage(houseMasterImages[index])
                                    }}

                                    parentWidth={width}
                                    dotColor={Colors.mainColor}
                                    inactiveDotColor={'white'}

                                    resizeMethod={'resize'}
                                    resizeMode={'cover'}

                                    paginationBoxVerticalPadding={20}
                                    paginationBoxStyle={{
                                        alignItems: "center",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                    }}

                                    imageLoadingColor={Colors.mainColor}


                                    autoplay={true}
                                    circleLoop={true}
                                />
                            </Card>

                            <View style={styles.locationsContainer}>
                                <View>
                                    <View style={styles.locationsTextContainer}>
                                        <FontAwesome5 name={'location-arrow'} size={16} color={Colors.complementary}/>
                                        <CustomText style={styles.locationsText}>Nearby locations</CustomText>
                                    </View>
                                    {nearByLocations ?
                                        <ScrollView
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                        >
                                            {nearByLocations.length > 0 ?
                                                <View style={{justifyContent: 'flex-start', ...styles.locationsCard,}}>
                                                    {nearByLocations.map((nearByLocation, index) => {
                                                        return (
                                                            <TouchableOpacity
                                                                key={index}
                                                                style={{
                                                                    ...styles.locationTouchableOpacity,
                                                                    height: orientation === 'portrait' ? height / 28 : height / 13
                                                                }}
                                                                onPress={() => {
                                                                    props.navigation.navigate('Map Screen', {
                                                                        nearByLocation: nearByLocation,
                                                                        category: null
                                                                    })
                                                                }}
                                                            >
                                                                <CustomText
                                                                    style={styles.locationText}>{nearByLocation.name}</CustomText>
                                                            </TouchableOpacity>
                                                        )
                                                    })}
                                                </View> :
                                                <CustomText style={styles.noLocationText}>No places found near your
                                                    location</CustomText>}
                                        </ScrollView> :
                                        <CustomText style={styles.noLocationText}>Make sure data and GPS are turned on to enjoy this feature.</CustomText>}
                                </View>
                            </View>


                            <View style={styles.exploreCard}>
                                <View style={styles.exploreTitleCard}>
                                    <Ionicons
                                        name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
                                        size={18}
                                        color={Colors.complementary}/>
                                    <CustomText style={styles.exploreTitle}>Explore houses</CustomText>
                                </View>
                                <FlatList
                                    style={{
                                        marginHorizontal: '2%'
                                    }}
                                    keyExtractor={item => item.id.toString()}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={shuffleHouses}
                                    initialNumToRender={2}
                                    renderItem={(itemData) => {
                                        return (
                                            <ExploreComponent
                                                navigation={props.navigation}
                                                house={itemData.item}/>
                                        )
                                    }}
                                    ListFooterComponent={() => {
                                        return (
                                            <View style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: orientation === 'portrait' ? height / 4 : height / 2,
                                                width: width / 1.6,
                                            }}>
                                                <TouchableOpacity
                                                    style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        backgroundColor: 'white',
                                                        height: 85,
                                                        width: 85,
                                                        borderRadius: 42.5
                                                    }}
                                                >
                                                    <FontAwesome5 name={'plus'} size={16} color={Colors.mainColor}/>
                                                    <CustomText style={styles.moreText}>More Houses</CustomText>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }}
                                    ListFooterComponentStyle={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: 10
                                    }}
                                />

                            </View>
                            <View style={styles.whatAreYouLookingForCardContainer}>
                                <View style={{flexDirection: 'row', marginHorizontal: '1%'}}>
                                    <FontAwesome5 name={"binoculars"} size={16} color={Colors.complementary}/>
                                    <CustomText style={styles.lookingForText}>What are you looking for?</CustomText>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-start',
                                    paddingLeft: '2.5%',
                                    paddingRight: '2.5%'
                                }}>
                                    {categories &&
                                    categories.map(category => {
                                        return (
                                            <View
                                                style={{elevation: 10}}
                                                key={category.id}
                                            >
                                                <TouchableOpacity

                                                    style={{
                                                        ...styles.lookingForCategoriesCard,
                                                        width: width / 2.45,
                                                        height: orientation === 'portrait' ? height / 7 : height / 3.5,
                                                    }}
                                                    onPress={() => {
                                                        props.navigation.navigate('Map Screen', {
                                                            nearByLocation: null,
                                                            category: category,
                                                        })
                                                    }}
                                                >
                                                    <ImageBackground
                                                        style={styles.lookingForImageBackground}
                                                        source={require('../media/keja_images.png')}
                                                    >
                                                        <CustomText
                                                            style={{...styles.categoryText}}>{category.house_category}</CustomText>
                                                    </ImageBackground>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })}

                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            width: '100%'
                                        }}
                                    >
                                        <FontAwesome5 name={'arrow-right'} size={16} color={Colors.complementary}/>
                                        <CustomText style={styles.moreCategoriesText}>more categories</CustomText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View> :
                <View
                    style={{
                        ...styles.spinnerView,
                        height: height,
                        width: width
                    }}
                ><ActivityIndicator size={'large'} color={Colors.mainColor}/></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginBottom: '1%'
    },
    spinnerView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        borderWidth: 1,
        width: '100%',
    },
    noLocationText: {
        marginLeft: 5
    },
    menuSearchContainer: {
        paddingTop: 30,
        paddingBottom: '1%',
        flexDirection: 'row',
        paddingHorizontal: '2%',
        backgroundColor: "rgba(235, 235, 235, 1)",

    },
    menuTouchableOpacity: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: '1%',
        borderRadius: 3
    },
    menuContainer: {
        flex: 2,
        overflow: 'hidden',
    },
    searchCard: {
        marginHorizontal: '1%',
        borderRadius: 50,
        flex: 12
    },
    searchContainer: {
        flexDirection: 'row',
        flex: 6,
    },
    searchInput: {
        flex: 6,
        paddingLeft: '2%',
        fontSize: 16
    },
    searchOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        borderColor: Colors.greyMonochromeLight,
    },
    locationsContainer: {
        marginTop: '1%',
        paddingBottom: '1%',
        paddingTop: '1%',
        marginHorizontal: '2%',
        backgroundColor: 'white',
        borderRadius: 10
    },
    locationsTextContainer: {
        flexDirection: 'row',
        marginHorizontal: '2%',
        alignItems: 'center'
    },
    locationsText: {
        fontSize: 16,
        color: Colors.grey,
        marginLeft: '1%'
    },
    sliderCard: {
        borderRadius: 10,
        marginHorizontal: '2%',
        overflow: 'hidden'
    },
    locationsCard: {
        marginHorizontal: 15,
        marginTop: 5,
        flexDirection: 'row',

    },
    locationTouchableOpacity: {
        borderColor: Colors.greyMonochromeLight2,
        borderWidth: 1,
        padding: 5,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: Colors.mainColorMonochromeLight2

    },
    locationText: {
        color: Colors.mainColor,
        fontSize: 16,
    },
    whatAreYouLookingForCardContainer: {
        paddingHorizontal: '1%',
        backgroundColor: 'white',
        marginHorizontal: '2%',
        borderRadius: 10,
        paddingVertical: '1%'
    },
    lookingForText: {
        fontSize: 16,
        color: Colors.grey,
        marginLeft: '1%'
    },
    lookingForCategoriesCard: {
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 5,
        marginHorizontal: '2%',
        marginBottom: '2%'
    },
    lookingForImageBackground: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: '10%',
        paddingBottom: '10%',
    },
    categoryText: {
        fontSize: 16,
        color: 'white'
    },
    moreCategoriesText: {
        color: Colors.complementary,
        marginLeft: '1%'
    },
    exploreCard: {
        marginVertical: '1%',
        backgroundColor: 'white',
        marginTop: '2%',
        borderRadius: 10,
    },
    exploreTitleCard: {
        flexDirection: 'row',
        paddingHorizontal: '2%',
        paddingTop: '1%'
    },
    exploreTitle: {
        fontSize: 16,
        color: Colors.grey,
        marginLeft: '1%'
    },
    moreText: {
        fontSize: 14,
        color: Colors.mainColor
    }

})


export default HomeScreen;
