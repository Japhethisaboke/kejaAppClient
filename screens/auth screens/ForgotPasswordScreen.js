import React, {useCallback, useReducer, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import CustomText from "../../components/CustomText";
import InputComponent from "../../components/input components/InputComponent";
import {FORM_UPDATE, formReducer} from "../../utilities/formReducer";
import Colors from "../../constants/Colors";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../store/actions/auth";
import * as Permissions from 'expo-permissions';
import ImageBrowser from "../../components/MultipleImageSelector/ImageBrowser";


const ForgotPasswordScreen = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const height = useSelector(state => state.uiReducer.height);

    const [formState, dispatchFromUseReducer] = useReducer(
        formReducer,
        {
            inputValues: {
                email: '',
            },
            inputValidities: {
                email: false
            },
            formIsValid: false
        }
    );

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFromUseReducer({
            type: FORM_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFromUseReducer]);

    const resetPasswordHandler = async () => {
        setIsLoading(true);
        try {
            await dispatch(resetPassword(formState.inputValues.email))
            Alert.alert(
                'Success',
                'A link has been sent to your email',
                [
                    {
                        text: 'OK',
                        onPress: () => props.navigation.goBack()
                    }
                ]
            )
        } catch (err) {
            throw err
        }
        setIsLoading(false);

    };
    const [isOpen, setIsOpen] = useState(false);

    const pickImage = async () => {
        const { status: cameraRollPerm } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
        );

        if (cameraRollPerm === 'granted') {
            setIsOpen(true)
        }
    };

    const toggleModal = () => {
        setIsOpen(prevState => !prevState)
    };

    const handleImages = images => {
        // console.log('picked images', images);
    };
    return (
        <ScrollView
            keyboardDismissMode="on-drag"
            style={styles.screen}
        >
            {!isLoading ?
                <View>
                    <View
                        style={styles.emailTextInputContainer}
                    >
                        <View
                            style={styles.labelStyleContainer}
                        >
                            <CustomText
                                style={styles.labelTextStyle}
                            >Email:</CustomText>
                        </View>

                        <InputComponent
                            initialValue={formState.inputValues.email}
                            initialValidity={false}

                            required
                            email
                            password

                            placeholder={'email'}
                            id={'email'}

                            onInputChange={inputChangeHandler}
                            inputSize={20}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            ...styles.resetPasswordOpacity,
                            backgroundColor: formState.formIsValid ? Colors.mainColor : Colors.mainColorMonochromeLight2
                        }}
                        disabled={!formState.formIsValid}
                        onPress={() => {
                            Keyboard.dismiss();
                            if (formState.formIsValid) {
                                resetPasswordHandler().catch((err) => {
                                    Alert.alert(
                                        'Error',
                                        err.message,
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => props.navigation.goBack()
                                            }
                                        ]
                                    )
                                });
                            } else {
                                Alert.alert(
                                    'Error',
                                    'Please enter a valid email',
                                )
                            }
                        }}
                    >
                        <CustomText
                            style={{
                                ...styles.resetPasswordText,
                            }}
                        >
                            Reset Password
                        </CustomText>
                    </TouchableOpacity>
                </View> :
                <View
                    style={{
                        height: height,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <ActivityIndicator size={'large'} color={Colors.mainColor}/>
                </View>}
            <View style={styles.container}>
                <TouchableOpacity onPress={pickImage}>
                    <Text>Open Picker</Text>
                </TouchableOpacity>
                {
                    <Modal
                        animated={true}
                        //ref={ref => (_modal = ref)}
                        animationType="slide"
                        transparent={true}
                        visible={isOpen}
                        onRequestClose={() => {}}
                    >
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={{ flex: 1 }}
                                onPress={toggleModal}
                            />
                            <View style={{...styles.modalContainer, height: height / 2}}>
                                <ImageBrowser
                                    onRequestClose={toggleModal}
                                    pickedImages={handleImages}
                                    maxImages={5}
                                />
                            </View>
                        </View>
                    </Modal>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 30
    },
    emailTextInputContainer: {
        margin: '2%'
    },
    labelStyleContainer: {
        marginBottom: '1%'
    },
    labelTextStyle: {
        color: Colors.mainColor,
        fontSize: 14
    },
    resetPasswordOpacity: {
        padding: '3%',
        margin: '2%',
        alignItems: 'center',
        borderRadius: 10
    },
    resetPasswordText: {
        color: 'white',
        fontSize: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#fff',
        paddingBottom: 18,
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 0.5,
        borderTopColor: 'grey',
    }
})


export default ForgotPasswordScreen;
