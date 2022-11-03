import React, {useCallback, useReducer, useState} from "react";
import {ActivityIndicator, Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import ImageSelector from "../../components/image components/ImageSelector";
import ImageItem from "../../components/image components/ImageItem";
import {FORM_UPDATE, formReducer} from "../../utilities/formReducer";
import CustomText from "../../components/CustomText";
import InputComponent from "../../components/input components/InputComponent";
import Colors from "../../constants/Colors";
import {createUser} from "../../store/actions/auth";
import {useDispatch, useSelector} from "react-redux";


const CreateUserScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const height = useSelector(state => state.uiReducer.height);
    const dispatch = useDispatch();
    const [formState, dispatchFromUseReducer] = useReducer(
        formReducer,
        {
            inputValues: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                retypePassword: '',
            },
            inputValidities: {
                username: '',
                firstName: false,
                lastName: false,
                email: false,
                password: false,
                retypePassword: false
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
    }, [dispatchFromUseReducer])

    const [image, setImage] = useState();
    const createUserHandler = async () => {
        setIsLoading(true);

        try {
            if (formState.inputValues.password!==formState.inputValues.retypePassword) {
                throw new Error('Passwords dont match.')
            }
            await dispatch(createUser(
                formState.inputValues.username,
                formState.inputValues.email,
                formState.inputValues.firstName,
                formState.inputValues.lastName,
                image,
                formState.inputValues.password,
                formState.inputValues.retypePassword
            ))
            Alert.alert(
                'Success',
                'An activation link has been sent to your email',
                [
                    {
                        text: 'OK',
                        onPress: () => props.navigation.goBack()
                    }
                ]
            )
        } catch (err) {
            Alert.alert('Error', err.message);
        }
        setIsLoading(false);
    };
    return (
        <ScrollView
            style={styles.screen}
        >
            {!isLoading ?
                <View>
                    <View
                        style={styles.imageSelectorPickerContainer}
                    >
                        <View
                            style={styles.imageContainer}
                        >{!image ? <Image
                                style={{height: '100%', width: '100%'}}
                                source={require('../../media/keja_image.png')}
                            /> :
                            <ImageItem image={image}/>}
                        </View>
                        <ImageSelector setImage={setImage}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText style={styles.labelTextStyle}>Username:</CustomText>
                        <InputComponent
                            initialValue={formState.inputValues.username}
                            initialValidity={false}

                            required
                            minLength={5}

                            placeholder={'Username'}
                            id={'username'}

                            onInputChange={inputChangeHandler}

                            underlineColorAndroid="transparent"
                            autoCorrect
                            inputSize={20}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText style={styles.labelTextStyle}>First name:</CustomText>
                        <InputComponent
                            initialValue={formState.inputValues.firstName}
                            initialValidity={false}

                            required
                            minLength={3}

                            placeholder={'Fist Name'}
                            id={'firstName'}

                            onInputChange={inputChangeHandler}

                            underlineColorAndroid="transparent"
                            autoCorrect
                            inputSize={20}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText style={styles.labelTextStyle}>last name:</CustomText>
                        <InputComponent
                            initialValue={formState.inputValues.lastName}
                            initialValidity={false}

                            required
                            minLength={3}

                            placeholder={'Last Name'}
                            id={'lastName'}

                            onInputChange={inputChangeHandler}

                            underlineColorAndroid="transparent"
                            autoCorrect
                            inputSize={20}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText style={styles.labelTextStyle}>Email:</CustomText>
                        <InputComponent
                            initialValue={formState.inputValues.email}
                            initialValidity={false}

                            required
                            email

                            placeholder={'Email'}
                            id={'email'}

                            onInputChange={inputChangeHandler}

                            underlineColorAndroid="transparent"
                            keyboardType="email-address"
                            autoCorrect
                            inputSize={20}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText style={styles.labelTextStyle}>Password:</CustomText>
                        <InputComponent
                            initialValue={formState.inputValues.password}
                            initialValidity={false}

                            required
                            passwordValidation

                            placeholder={'Password'}
                            id={'password'}

                            onInputChange={inputChangeHandler}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}

                            inputSize={20}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <CustomText style={styles.labelTextStyle}>Retype password:</CustomText>
                        <InputComponent
                            initialValue={formState.inputValues.retypePassword}
                            initialValidity={false}

                            required
                            passwordValidation

                            placeholder={'Retyped Password'}
                            id={'retypePassword'}

                            onInputChange={inputChangeHandler}
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            autoCorrect={false}
                            inputSize={20}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            ...styles.signUpOpacity,
                            backgroundColor: formState.formIsValid ? Colors.mainColor : Colors.mainColorMonochromeLight2,
                        }}
                        onPress={createUserHandler}
                    >
                        <CustomText style={styles.signUpText}>Sign Up</CustomText>
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 30
    },
    imageContainer: {
        height: 200,
        width: 200,
        borderWidth: 1
    },
    imageSelectorPickerContainer: {
        alignItems: 'center'
    },
    labelTextStyle: {
        color: Colors.mainColor,
        fontSize: 14
    },
    inputContainer: {
        marginHorizontal: '3%',
        marginTop: '3%'
    },
    signUpOpacity: {
        alignItems: 'center',
        paddingVertical: '2%',
        marginHorizontal: '1%',
        marginTop: '3%',
        borderRadius: 10
    },
    signUpText: {
        color: 'white',
        fontSize: 20,
    },
})

export default CreateUserScreen;
