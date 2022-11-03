import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ActivityIndicator, StyleSheet, Switch, TouchableOpacity, View} from "react-native";
import Card from "./Card";
import CustomText from "./CustomText";
import Colors from "../constants/Colors";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {setDstvStore, setPriceStore, setRoomsStore, setWifiStore} from "../store/actions/filters";
import {setCategoryHouseFilters, setHouseFilters} from "../store/actions/houses";


const FiltersComponent = (props) => {
    const dispatch = useDispatch();

    const houses = useSelector(state => state.houses.houses);
    const houseCategory = useSelector(state => state.houses.housesCategory);



    const dstvStore = useSelector(state => state.filtersReducer.dstv);
    const wifiStore = useSelector(state => state.filtersReducer.wifi);
    const priceStore = useSelector(state => state.filtersReducer.price);
    const roomsStore = useSelector(state => state.filtersReducer.rooms);

    const [dstv, setDstv] = useState(dstvStore);
    const [wifi, setWifi] = useState(wifiStore);
    const [price, setPrice] = useState([priceStore.low, priceStore.high]);
    const [rooms, setRooms] = useState([roomsStore.low, roomsStore.high]);
    const [isLoading, setIsLoading] = useState(false);


    return (
        <View style={{...styles.screen}}>
            {!isLoading ?
                <Card style={styles.cardStyles}>
                    <View style={styles.amenitiesContainerStyles}>
                        <CustomText style={styles.labelStyle}>DSTV</CustomText>
                        <Switch
                            trackColor={{
                                false: Colors.greyMonochromeLight,
                                true: Colors.mainColorMonochromeLight
                            }}
                            thumbColor={Colors.mainColor}
                            value={dstv}
                            onValueChange={(value) => {
                                setDstv(value);
                            }}
                        />
                    </View>

                    <View style={styles.amenitiesContainerStyles}>
                        <CustomText style={styles.labelStyle}>WIFI</CustomText>
                        <Switch
                            trackColor={{
                                false: Colors.greyMonochromeLight,
                                true: Colors.mainColorMonochromeLight
                            }}
                            thumbColor={Colors.mainColor}
                            value={wifi}
                            onValueChange={(value) => {
                                setWifi(value);
                            }}
                        />
                    </View>
                    <View style={styles.amenitiesContainerStyles}>
                        <CustomText style={{...styles.labelStyle, marginRight: '4%'}}>Price</CustomText>
                        <View>
                            <View style={styles.priceTextContainer}>
                                <CustomText style={styles.sliderText}>min > {price[0]}</CustomText>
                                <CustomText style={styles.sliderText}>max {'<'} {price[1]}</CustomText>
                            </View>
                            <MultiSlider
                                trackStyle={{backgroundColor: Colors.grey}}
                                selectedStyle={{backgroundColor: Colors.mainColorMonochromeLight}}
                                sliderLength={250}
                                min={4000}
                                max={100000}
                                step={100}
                                allowOverlap={false}
                                values={[...price]}
                                onValuesChange={(values) => {
                                    setPrice(values)
                                }}
                                snapped
                                markerStyle={{
                                    backgroundColor: Colors.mainColor
                                }}
                                containerStyle={{
                                    paddingHorizontal: '5%'
                                }}

                            />
                        </View>
                    </View>
                    <View style={styles.amenitiesContainerStyles}>
                        <CustomText style={styles.labelStyle}>Rooms</CustomText>
                        <View>
                            <View style={styles.priceTextContainer}>
                                <CustomText style={styles.sliderText}>min > {rooms[0]}</CustomText>
                                <CustomText style={styles.sliderText}>max {'<'} {rooms[1]}</CustomText>
                            </View>
                            <MultiSlider
                                trackStyle={{backgroundColor: Colors.grey}}
                                selectedStyle={{backgroundColor: Colors.mainColorMonochromeLight}}
                                sliderLength={250}
                                min={0}
                                max={10}
                                step={1}
                                allowOverlap={false}
                                values={[...rooms]}
                                onValuesChange={(values) => {
                                    setRooms(values)
                                }}
                                snapped
                                markerStyle={{
                                    backgroundColor: Colors.mainColor
                                }}
                                containerStyle={{
                                    paddingHorizontal: '5%'
                                }}

                            />
                        </View>
                    </View>
                    <View style={styles.touchableOpacityContainer}>
                        <TouchableOpacity
                            style={styles.touchableOpacityStyles}
                            onPress={async () => {
                                dispatch(setRoomsStore(rooms[0], rooms[1]));
                                dispatch(setPriceStore(price[0], price[1]));
                                dispatch(setWifiStore(wifi));
                                dispatch(setDstvStore(dstv));
                                if (props.category) {
                                    dispatch(setCategoryHouseFilters(
                                        houseCategory,{
                                            rooms: {
                                                low: rooms[0],
                                                high: rooms[1]
                                            },
                                            price: {
                                                low: price[0],
                                                high: price[1]
                                            },
                                            dstv: dstv,
                                            wifi: wifi
                                        }
                                    ));
                                } else {
                                    dispatch(setHouseFilters(
                                        houses,{
                                            rooms: {
                                                low: rooms[0],
                                                high: rooms[1]
                                            },
                                            price: {
                                                low: price[0],
                                                high: price[1]
                                            },
                                            dstv: dstv,
                                            wifi: wifi
                                        }));
                                }
                                setIsLoading(true);
                                props.setIsFilter(false)
                            }}
                        ><CustomText style={styles.touchableOpacityText}>Save</CustomText></TouchableOpacity>
                        <TouchableOpacity
                            style={styles.touchableOpacityStyles}
                            onPress={() => {
                                props.setIsFilter(false)
                            }}
                        ><CustomText style={styles.touchableOpacityText}>Back</CustomText></TouchableOpacity>
                    </View>
                </Card> : <ActivityIndicator size={'large'} color={Colors.mainColor}/>}
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: "rgba(255, 255, 255, 0.4)"
    },
    cardStyles: {
        padding: 10,
        borderRadius: 10
    },
    amenitiesContainerStyles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    touchableOpacityStyles: {
        backgroundColor: Colors.mainColor,
        borderRadius: 30,
        overflow: 'hidden'
    },
    touchableOpacityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    touchableOpacityText: {
        color: 'white',
        paddingVertical: 15,
        paddingHorizontal: 25
    },
    sliderText: {
        color: Colors.complementary,
        fontSize: 16
    },
    labelStyle: {
        fontSize: 16,
    }
});

export default FiltersComponent;
