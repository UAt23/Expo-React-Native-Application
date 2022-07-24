import React, { useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

import Logo from '../../assets/registeration/kamyongo_logo.png';
const {width, height} = Dimensions.get('window');


const ConfirmationCodeScreen = () => {

    const [confirmCode, setCode] = useState(null)

    const navigation = useNavigation();
    const route = useRoute();



    const onButtonPressed = () => {

        // fetch("http://44.206.43.168/api/verify_message", {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         tel_number: route.params.number,
        //         code: confirmCode
        //     }),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // }).then(function(response){ 
        //     return response.json()})
        //     .then(function(data) {
        //         if (data.status === "Success") {
                    
        //             navigation.navigate('UserAuth', {number_verified: route.params.number})
                    
        //         }
        //     }).catch(error => console.error('Error:', error)); 
            
        navigation.navigate('UserAuth', {number_verified: route.params.number})
    }


    return (
        <DismissKeyboard>
            <View style={[styles.root, {height: height}]}>
                <View style={styles.screenContent}>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.headerTwo}>SMS ile gelen kodu giriniz</Text>
                            <TextInput 
                                style={styles.phoneInput}
                                keyboardType= 'phone-pad'
                                defaultValue={confirmCode}
                                onChangeText={newCode => setCode(newCode)}
                            />
                        </View>
                        <View>
                            <Pressable onPress={onButtonPressed} style={({pressed}) => [{
                                    backgroundColor: pressed 
                                    ? '#81E47C'
                                    : '#36d42d'
                                },
                                styles.button]}>
                                <Text style={styles.buttonInner}>TAMAM</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </DismissKeyboard>
        

    );
};

const styles = StyleSheet.create({
    root: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#16234e",
        
    },
    logo: {
        width: '60%',
        maxWidth: '85%',
        maxHeight: 300,
        flex: 0.2

    },
    headerOne: {
        color: "white",
        flex: 0.2,
        fontSize: 24,
        textAlign: 'center',
        padding: 4,
        fontWeight: "300",
    },
    headerTwo: {
        color: "white",
        fontSize: 18,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "300",
    },
    phoneInput: {
        backgroundColor: "white",
        borderRadius: 12,
        height: 50,
        paddingLeft: 20
    },
    screenContent: {
        flex: 0.8,
        justifyContent: 'space-between',
        width: '80%',
        
    },
    button: {
        alignItems: 'center',
        width: "100%",
        padding: 10,
        borderRadius: 12,
        // marginBottom: 13
        
    },
    buttonInner: {
        color: 'white',
        fontWeight: '600',
        fontSize: 24,
        

    },
    testimonial: {
        color: 'white',
        marginTop: 10,

    }
});

export default ConfirmationCodeScreen;