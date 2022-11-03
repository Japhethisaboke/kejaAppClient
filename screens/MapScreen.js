import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import Search from "../components/map components/search";
import Colors from "../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import MapView from "react-native-map-clustering";
import {fetchHouses, fetchHousesCategory} from "../store/actions/houses";
import {getLocationHandler} from "../utilities/utilities";
import {Marker} from "react-native-maps";
import FiltersComponent from "../components/FiltersComponent";


const MapScreen = (props) => {
    const {nearByLocation} = props.route.params;
    const {category} = props.route.params;

    const dispatch = useDispatch()

    const dstv = useSelector(state => state.filtersReducer.dstv);
    const wifi = useSelector(state => state.filtersReducer.wifi);
    const price = useSelector(state => state.filtersReducer.price);
    const rooms = useSelector(state => state.filtersReducer.rooms);


    let houses = useSelector(state => state.houses.filteredHouses);

    if (category) {
        houses = useSelector(state => state.houses.filteredCategoryHouses);
    }
    ;

    if (houses) {
        if (houses.length <= 0) {
            Alert.alert('No Houses', 'Please edit your filters.')
        }
    }


    const height = useSelector(state => state.uiReducer.height);
    const width = useSelector(state => state.uiReducer.width);

    const orientation = height > width ? 'portrait' : 'landscape';

    const aspectRatio = width / height;

    const latitude_delta = 0.0072;
    const longitude_delta = latitude_delta * aspectRatio;


    let nearByLocationMapScreen;
    if (nearByLocation) {
        const latDelta = nearByLocation.geometry.viewport.northeast.lat - nearByLocation.geometry.viewport.southwest.lat;
        nearByLocationMapScreen = {
            latitude: nearByLocation.geometry.location.lat,
            longitude: nearByLocation.geometry.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: latDelta * aspectRatio
        }
    }
    ;

    const [region, setRegion] = useState(nearByLocationMapScreen);


    const [mapWidth, setMapWidth] = useState('99%')
    const [isFilter, setIsFilter] = useState(false);

    const updateMapStyle = (width) => {
        setMapWidth(width);
    }

    const [isSearch, setIsSearch] = useState(nearByLocation ? false : true);


    const setIsSearchHandler = () => {
        setIsSearch(prevState => !prevState)
    };


    const setRegionHandler = (lat, lng, latDelta) => {
        const lngDelta = latDelta * aspectRatio;
        setRegion(prevState => {
            return {
                ...prevState,
                latitude: lat,
                longitude: lng,
                latitudeDelta: latDelta,
                longitudeDelta: lngDelta


            }
        })
    };

    const fetchHousesScreen = useCallback(async () => {
        try {
            if (category) {
                await dispatch(
                    fetchHousesCategory(category.id,
                        {
                            rooms: rooms,
                            price: price,
                            dstv: dstv,
                            wifi: wifi
                        }
                    ));
            } else {
                await dispatch(fetchHouses(
                    {
                        rooms: rooms,
                        price: price,
                        dstv: dstv,
                        wifi: wifi
                    }
                ));
            }

        } catch (err) {
            Alert.alert('Error', 'Check your internet connection.')
        }
    }, [dispatch]);

    const setCurrentLocation = async () => {
        try {
            const {latitude, longitude} = await getLocationHandler();
            setRegion(prevState => {
                return {
                    ...prevState,
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: latitude_delta,
                    longitudeDelta: longitude_delta
                }
            })


        } catch (err) {
            setIsSearch(true);
            return err;
        }
    };

    useEffect(() => {
        if (nearByLocation === null) {
            setCurrentLocation().catch((err) => {
                Alert.alert("Couldn't fetch your location", 'Make sure your GPS and data are turned on');
            });
        }
        ;

        fetchHousesScreen();
    }, []);


    return (
        <View style={styles.screen}>
            {region &&
            <MapView
                provider={"google"}
                region={region}

                onMapReady={() => {
                    updateMapStyle('100%');
                }}
                onPress={() => {
                    setIsSearch(false);
                    setIsFilter(false)
                }}
                style={{...styles.mapStyle, width: mapWidth,}}
                onRegionChangeComplete={region => {
                    setRegion((prevState) => {
                        return (
                            {
                                ...prevState,
                                latitude: region.latitude,
                                longitude: region.longitude,
                                latitudeDelta: region.latitudeDelta,
                                longitudeDelta: region.longitudeDelta
                            }
                        )
                    });
                }}

                zoomControlEnabled={!isSearch}
                showsUserLocation={true}
                userLocationPriority={'medium'}
                userLocationUpdateInterval={3000}
                showsBuildings={true}
                showsMyLocationButton={true}
                loadingEnabled={true}

                clusterColor={Colors.mainColor}
            >

                {houses && houses.map((house) => (
                    <Marker
                        key={house.id}
                        coordinate={{
                            latitude: house.geometry.coordinates[1],
                            longitude: house.geometry.coordinates[0]
                        }}


                        onCalloutPress={() => {
                            props.navigation.navigate('House Details Screen',
                                {
                                    house: house,
                                    fromOwner: false
                                })
                        }}

                        title={house.properties.name}
                        tracksViewChanges={false}

                        style={{
                            height: 33,
                            width: 33
                        }}
                    >
                        <View
                            style={{
                                height: '100%',
                                width: '100%',
                                elevation: 10,
                                radius: 50,
                                overflow: 'hidden'
                            }}
                        >
                            <Image source={require('../media/location.png')}
                                   style={{
                                       height: '100%',
                                       width: '100%',
                                   }}
                            />
                        </View>
                    </Marker>
                ))
                }
            </MapView>}
            {!isFilter &&
            <View style={styles.searchContainer}>
                {
                    isSearch ?
                        <Search
                            container={{
                                width: orientation === 'portrait' ? 300 : 700
                            }}
                            setCoordinatesHandler={setRegionHandler}
                            setIsSearchHandler={setIsSearchHandler}
                        /> :
                        <TouchableOpacity
                            style={styles.touchableOpacityStyle}
                            onPress={() => {
                                setIsSearchHandler(true);
                            }}
                        >
                            <Ionicons
                                name={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
                                size={33} color={Colors.mainColor}
                            />
                        </TouchableOpacity>
                }
            </View>}
            {!isSearch &&
            <View style={styles.filterButtonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setIsFilter(true);
                    }}
                >
                    <FontAwesome5 name={'filter'} size={25} color={Colors.mainColor}/>
                </TouchableOpacity>
            </View>}
            {isFilter && <FiltersComponent category={category} setIsFilter={setIsFilter}/>}
        </View>


    )
};

const styles = StyleSheet.create({
    screen: {
        marginTop: 30,
        flex: 1
    },
    mapStyle: {
        height: '100%'
    },
    searchContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        elevation: 5,
        borderRadius: 3,
        overflow: 'hidden',
        borderWidth: 0.2,
        borderColor: Colors.mainColor
    },
    touchableOpacityStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        flex: 1
    },
    filterButtonContainer: {
        position: 'absolute',
        bottom: 100,
        right: 10,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: 7,
        borderColor: Colors.mainColor,
        borderWidth: 0.2,
        borderRadius: 3
    }
})

export default MapScreen;
