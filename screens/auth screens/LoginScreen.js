import React, {useCallback, useReducer, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import CustomText from "../../components/CustomText";
import InputComponent from "../../components/input components/InputComponent";
import {FontAwesome5} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {logInFacebook, signInWithGoogleAsync} from "../../utilities/utilities";
import {loginNormal, loginSocial} from "../../store/actions/auth";
import {FORM_UPDATE, formReducer} from "../../utilities/formReducer";



const LoginScreen = (props) => {
    const height = useSelector(state => state.uiReducer.height);
    const width = useSelector(state => state.uiReducer.width);
    const [isLoading, setIsLoading] = useState(false);
    let authValues;
    const dispatch = useDispatch()

    const [formState, dispatchFromUseReducer] = useReducer(
        formReducer,
        {
            inputValues: {
                username: '',
                password: ''
            },
            inputValidities: {
                username: false,
                password: false
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

    const signGoogleHandler = async () => {
        setIsLoading(true);
        try {
            const token = await signInWithGoogleAsync();
            const backend = 'google-oauth2';
            if (!token.cancelled) {
                await dispatch(loginSocial(token, backend));
            }
        } catch (err) {
            Alert.alert(
                'Error',
                'Something went terribly wrong.'
            );
        }
        setIsLoading(false);
    };

    const signFacebookHandler = async () => {
        setIsLoading(true);
        try {
            const token = await logInFacebook();
            const backend = 'facebook';
            if (!token.cancelled) {
                await dispatch(loginSocial(token, backend));
            }
        } catch (err) {
            Alert.alert(
                'Error',
                'Something went terribly wrong.'
            );
        }
        setIsLoading(false);
    };
    
    const loginNormalHandler = async () => {
        setIsLoading(true);
        try {
            await dispatch(loginNormal(formState.inputValues.username, formState.inputValues.password))
        } catch (err) {
            Alert.alert(
                'Error',
                err.message
            );
        }
        setIsLoading(false);
    };

    return (
        <ScrollView
            style={{
                ...styles.screen
            }}
            keyboardDismissMode="on-drag"
        >
            {!isLoading ?
                <View>
                    <View style={styles.inputContainer}>
                        <View style={{...styles.labelStyleContainer}}>
                            <CustomText style={styles.labelTextStyle}>Username or Email:</CustomText>
                        </View>
                        <InputComponent
                            initialValue={formState.inputValues.username}
                            initialValidity={false}

                            required
                            minLength={5}

                            placeholder={'Username or Email'}
                            id={'username'}
                            keyboardType="email-address"

                            onInputChange={inputChangeHandler}
                            inputSize={20}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={{...styles.labelStyleContainer}}>
                            <CustomText style={styles.labelTextStyle}>Password:</CustomText>
                        </View>
                        <InputComponent
                            initialValue={formState.inputValues.password}
                            initialValidity={false}

                            required
                            password
                            secureTextEntry={true}
                            passwordValidation

                            placeholder={'Password'}
                            id={'password'}

                            onInputChange={inputChangeHandler}
                            inputSize={20}
                        />
                    </View>
                    <TouchableOpacity
                        style={{marginVertical: '2%'}}
                        onPress={() => {
                            props.navigation.navigate('Forgot Password Screen')
                        }}
                    >
                        <CustomText style={styles.forgotPasswordText}>Forgot your password?</CustomText>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity
                            style={{
                                ...styles.signIn,
                                backgroundColor: formState.formIsValid ? Colors.mainColor : Colors.mainColorMonochromeLight2,
                            }}
                            onPress={loginNormalHandler}
                            disabled={!formState.formIsValid}
                        >
                            <CustomText style={styles.signInText}>Login</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                ...styles.signIn,
                                backgroundColor: Colors.mainColor
                            }}
                            onPress={() => {
                                props.navigation.navigate('Create User Screen')
                            }}
                        >
                            <CustomText style={styles.signInText}>Sign Up</CustomText>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginVertical: '3%',
                            alignItems: 'center'
                        }}
                    >
                        <CustomText style={styles.orText}>or</CustomText>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity
                            style={styles.signInWithFacebook}
                            onPress={signFacebookHandler}
                        >
                            <FontAwesome5 name={"facebook-f"} size={16} color={'#3b5998'}/>
                            <CustomText style={styles.facebookText}>Sign in with Facebook</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.signInWithFacebook}
                            onPress={signGoogleHandler}
                        >
                            <FontAwesome5 name={"google"} size={16} color={'#db3236'}/>
                            <CustomText style={styles.googleText}>Sign in with Google</CustomText>
                        </TouchableOpacity>
                    </View>
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
        paddingHorizontal: '3%',
        marginTop: 30
    },
    labelStyleContainer: {
        marginBottom: '1%'
    },
    inputContainer: {
        marginTop: '3%'
    },
    labelTextStyle: {
        color: Colors.mainColor,
        fontSize: 14
    },
    forgotPasswordText: {
        color: Colors.complementary,
        fontSize: 16
    },
    signIn: {
        padding: '3%',
        margin: '2%',
        flex: 1,
        alignItems: 'center',
        borderRadius: 10
    },
    signInText: {
        color: 'white',
        fontSize: 20
    },
    signInWithFacebook: {
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: Colors.greyMonochromeLight2,
        padding: '1%',
        borderRadius: 5,
        marginBottom: '1%'
    },
    facebookText: {
        fontSize: 14,
        marginRight: '5%',
        color: '#3b5998'
    },
    googleText: {
        fontSize: 14,
        marginRight: '5%',
        color: '#db3236'
    },
    orText: {
        fontSize: 20,
        color: Colors.grey
    }
});

export default LoginScreen;
