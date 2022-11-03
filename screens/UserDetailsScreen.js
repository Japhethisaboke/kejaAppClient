import React, {useEffect} from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import CustomText from "../components/CustomText";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {fetchOwnerHouse, resetOwnerHouses} from "../store/actions/houses";
import OwnerHouseComponent from "../components/OwnerHouseComponent";


const UserDetailsScreen = (props) => {
    const height = useSelector(state => state.uiReducer.height);
    const width = useSelector(state => state.uiReducer.width);
    const owner = useSelector(state => state.usersReducer.owner);
    const ownerHouses = useSelector(state => state.houses.ownerHouses);

    const dispatch = useDispatch();

    const orientation = height < width ? 'landscape' : 'portrait';

    const ownerHouseHandler = async () => {
        try {
            await dispatch(fetchOwnerHouse(owner.id));
        } catch (err) {
            return err
        }
    };

    useEffect(() => {
        ownerHouseHandler().catch(err => {
            Alert.alert("Couldn't fetch owner houses", 'Make sure your data is turned on');
        });

        // const unsubscribe = props.navigation.addListener('blur', () => {
        //     dispatch(resetOwnerHouses());
        // });
        // return (() => {
        //     unsubscribe();
        // })
    }, []);

    return (
        <ScrollView style={styles.screen}
        >
            <View
                style={{
                    ...styles.profilePictureContainer,
                    height: orientation === 'portrait' ? height / 3.9 : height / 1.9
                }}>
                <ImageBackground source={require('../media/keja_images.png')} style={{flex: 2}}/>
                <View style={{flex: 1}}/>
                <View style={{
                    height: orientation === 'portrait' ? height / 6 : height / 2.8,
                    width: orientation === 'portrait' ? width / 3 : width / 6,
                    top: orientation === 'portrait' ? '32%' : '28%',
                    ...styles.imageStyle
                }}>
                    <Image
                        source={{uri: owner.picture}}
                        style={{
                            flex: 1,
                            borderRadius: 200,
                        }}
                    />
                </View>
            </View>
            <View style={styles.ownerUsernameNameContainer}>
                <View style={{flexDirection: 'row'}}>
                    <CustomText style={styles.ownerName}>{owner.first_name} </CustomText>
                    <CustomText style={styles.ownerName}>{owner.last_name}</CustomText>
                </View>
                <View>
                    <CustomText style={styles.ownerUsername}>@{owner.username}</CustomText>
                </View>
            </View>
            <View style={{...styles.bioContainer, ...styles.container}}>
                <CustomText style={styles.containerHeading}>Bio</CustomText>
                <View style={styles.phoneEmailContainer}>
                    <View style={styles.contactContainer}>
                        <TouchableOpacity style={styles.contactsIcons}>
                            <FontAwesome5 name={'phone'} size={20} color={'white'}/>
                        </TouchableOpacity>
                        <CustomText style={styles.contactText}>0{owner.phone}</CustomText>
                    </View>
                    <View style={styles.contactContainer}>
                        <TouchableOpacity style={styles.contactsIcons}>
                            <FontAwesome5 name={'envelope'} size={20} color={'white'}/>
                        </TouchableOpacity>
                        <CustomText style={styles.contactText}>{owner.email}</CustomText>
                    </View>
                    <View style={styles.contactContainer}>
                        <CustomText style={styles.contactText}><CustomText style={styles.dateJoinedLabel}>Date
                            joined</CustomText>: {owner.date_joined}</CustomText>
                    </View>
                </View>
            </View>
            <View style={{...styles.container}}>
                <CustomText style={styles.containerHeading}>Houses</CustomText>
                {ownerHouses ?
                <FlatList
                    style={{
                        paddingTop: '1%',
                        paddingBottom: '1%',
                        paddingHorizontal: '1%'
                    }}
                    horizontal={true}
                    data={ownerHouses}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={(itemData) => {
                        return (
                            <OwnerHouseComponent
                                house={itemData.item}
                                navigation={props.navigation}
                            />
                        )
                    }}/> : <ActivityIndicator size={'large'} color={Colors.mainColor} />}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        marginTop: 30,
        flex: 1
    },
    profilePictureContainer: {},
    imageStyle: {
        overflow: 'hidden',
        backgroundColor: 'white',
        padding: '2%',
        borderRadius: 200,
        marginLeft: '1%',
        position: 'absolute',
        display: 'flex'
    },
    ownerUsernameNameContainer: {
        margin: '1%',
    },
    ownerName: {
        fontSize: 20,
        color: Colors.mainColorMonochromeDark2
    },
    ownerUsername: {
        fontSize: 16,
        color: Colors.mainColorMonochromeDark2
    },
    container: {
        marginHorizontal: '1%',
        marginVertical: '0.5%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: '1%'
    },
    bioContainer: {},
    phoneEmailContainer: {
        padding: '1%'
    },
    contactsIcons: {
        backgroundColor: Colors.mainColor,
        padding: '1%',
        borderRadius: 3,
        marginRight: '1%'
    },
    contactContainer: {
        flexDirection: 'row',
        marginVertical: '1%',
        alignItems: 'center'
    },
    containerHeading: {
        color: Colors.complementary,
        fontSize: 16
    },
    contactText: {
        fontSize: 18,
        color: Colors.grey
    },
    dateJoinedLabel: {
        color: Colors.mainColor
    }
})

export default UserDetailsScreen;
