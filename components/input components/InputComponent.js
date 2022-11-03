import React, {useEffect, useReducer} from "react";
import {StyleSheet, TextInput, View} from "react-native";
import CustomText from "../CustomText";
import Colors from "../../constants/Colors";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';


const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            };

        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state
    }
};


const InputComponent = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValidity,
        touched: false
    });

    const {onInputChange, id} = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid)
        }

    }, [inputState]);

    const textChangeHandler = text => {

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.trim().toLowerCase())) {
            isValid = false;
        }
        if (props.passwordValidation && !passwordRegex.test(text)) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        if (props.number != null && Number.isInteger(+text) === false) {
            isValid = false;
        }

        dispatch({type: INPUT_CHANGE, value: text, isValid: isValid})
    };


    const lostFocusHandler = () => {
        dispatch({type: INPUT_BLUR});
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.inputsContainer}>
                <TextInput
                    {...props}
                    value={inputState.value}
                    onChangeText={text => {
                        textChangeHandler(text);
                    }}
                    onBlur={lostFocusHandler}
                    style={{...styles.inputStyle, fontSize: props.inputSize}}

                    underlineColorAndroid='transparent'
                />
            </View>
            {!inputState.isValid && inputState.touched &&
            <View style={styles.errorContainer}>
                <CustomText style={styles.textStyle}>Enter Valid {props.placeholder}</CustomText>
            </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    inputStyleContainer: {},
    inputsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: Colors.greyMonochromeLight2
    },
    errorContainer: {
        borderRadius: 10,
        alignItems: 'center',
        margin: '1%',
        justifyContent: 'center',
    },
    textStyle: {
        color: 'red',
        textAlign: 'center',
    },
    inputStyle: {
        flex: 1
    }
});


export default InputComponent;
