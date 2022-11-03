import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView, StyleSheet, View} from "react-native";
import InputComponent from "../../components/input components/InputComponent";
import {useDispatch, useSelector} from "react-redux";
import DropboxComponent from "../../components/input components/DropboxComponent";
import CategoryDropbox from "../../components/input components/CategoryDropbox";
import LocationPicker from "../../components/map components/LocationPicker";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {createHouse} from "../../store/actions/houses";
import Colors from "../../constants/Colors";
import CustomFontAwesomeHeaderButton from "../../components/CustomFontAwesomeHeaderButton";
import ImageSelector from "../../components/image components/ImageSelector";
import ImageItem from "../../components/image components/ImageItem";
import {FORM_UPDATE, formReducer} from "../../utilities/formReducer";
import CustomText from "../../components/CustomText";


const NewHouseScreen = props => {
    const dispatch = useDispatch();

    props.navigation.setOptions({
        title: 'Houses',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomFontAwesomeHeaderButton}>
                <Item
                    title={'Menu'}
                    iconName={'floppy-o'}
                    onPress={async () => {
                        if (!formState.formIsValid) {
                            Alert.alert('Error', 'Please fill out all the required fields.');
                            return;
                        }
                        if (!location) {
                            Alert.alert('Error', 'Please select a location.');
                            return;
                        }
                        if (images.length < 1) {
                            Alert.alert('Error', 'Please select at least one image.');
                            return;
                        }

                        setIsCreating(true);

                        try {
                            await dispatch(createHouse(
                                formState.inputValues.name,
                                category,
                                formState.inputValues.rooms,
                                +formState.inputValues.price,
                                location,
                                wifi,
                                dstv,
                                images
                            ));
                            inputChangeHandler('name', '', false);
                            inputChangeHandler('price', '', false);
                            inputChangeHandler('rooms', 0, true);
                            setLocation(null);
                            setImages([]);
                            setIsCreating(false);
                            props.navigation.goBack();
                        } catch (err) {
                            setIsCreating(false);
                            Alert.alert('Error', 'Something went wrong.Please try another time.');
                        }


                    }}/>
            </HeaderButtons>
        ),
        // headerStyle: {height: 200, backgroundColor: 'grey'} editing header style through screen
    });


    const height = useSelector(state => state.uiReducer.height);
    const width = useSelector(state => state.uiReducer.width);
    const orientation = height < width ? 'landscape' : 'portrait';


    const [dstv, setDstv] = useState(false);
    const [wifi, setWifi] = useState(false);
    const [category, setCategory] = useState(1);
    const [location, setLocation] = useState();
    const [images, setImages] = useState([]);

    const [isCreating, setIsCreating] = useState(false);

    let houseForFields;

    if (!(typeof props.route.params === 'undefined')) {
        const {house} = props.route.params;
        houseForFields = house;
    }
    ;

    const [formState, dispatchFromUseReducer] = useReducer(
        formReducer,
        {
            inputValues: {
                name: houseForFields ? houseForFields.name : '',
                rooms: houseForFields ? houseForFields.rooms : '0',
                price: houseForFields ? houseForFields.price : '',
            },
            inputValidities: {
                name: houseForFields ? true : false,
                rooms: true,
                price: houseForFields ? true : false,
            },
            formIsValid: houseForFields ? true : false
        }
    );

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFromUseReducer({
            type: FORM_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFromUseReducer])

    useEffect(() => {
    }, [dstv])


    return (
        <ScrollView>
            {isCreating === false ?
                <View>
                    <View>
                        <CustomText>Name:</CustomText>
                        <InputComponent
                            initialValue={houseForFields ? houseForFields.name : ''}
                            initialValidity={!!houseForFields}

                            required
                            minLength={5}

                            placeholder={'name'}
                            id={'name'}

                            onInputChange={inputChangeHandler}

                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            keyboardType="visible-password"
                        />
                    </View>
                    <CategoryDropbox
                        label={'Category'}
                        value={category}
                        onChange={setCategory}
                    />
                    {category !== 1 && category !== 6 && category !== 5 &&
                    <View>
                        <CustomText>Rooms:</CustomText>
                        <InputComponent
                            initialValue={houseForFields ? houseForFields.rooms : '0'}
                            initialValidity={!!houseForFields}

                            required
                            number

                            placeholder={'Rooms'}
                            id={'rooms'}

                            onInputChange={inputChangeHandler}

                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            keyboardType="phone-pad"
                        />
                    </View>
                    }
                    <View>
                        <CustomText>Price:</CustomText>
                        <InputComponent
                            initialValue={houseForFields ? houseForFields.price : ''}
                            initialValidity={!!houseForFields}

                            required
                            number

                            placeholder={'price'}
                            id={'price'}
                            min={5000}

                            onInputChange={inputChangeHandler}

                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <DropboxComponent
                        label={'DSTV'}
                        value={dstv}
                        onChange={setDstv}
                    />
                    <DropboxComponent
                        label={'WIFI'}
                        value={wifi}
                        onChange={setWifi}
                    />

                    <View style={{
                        ...styles.scrollViewStyles,
                        height: orientation === 'portrait' ? height / 3.6 : height / 1.9
                    }}>
                        <ScrollView style={{flex: 1}} horizontal={true}>
                            {images.length > 0 && images.map((image, index) => <View key={index} style={{height: height/4, width: width/2}}><ImageItem  image={image}/></View>)}
                            <ImageSelector setImages={setImages}/>
                        </ScrollView>

                    </View>

                    <LocationPicker
                        setLocation={setLocation}
                        location={location}
                    />
                </View> :
                <View style={{...styles.activityIndicatorContainer, height: height, width: width}}><ActivityIndicator
                    size='large' color={Colors.mainColor}/></View>}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollViewStyles: {
        margin: '1%'
    }
})

export default NewHouseScreen;
