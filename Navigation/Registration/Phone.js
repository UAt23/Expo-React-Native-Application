import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, Keyboard,  TouchableWithoutFeedback} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import Logo from '../../assets/registeration/kamyongo_logo.png';

const {width, height} = Dimensions.get('window');

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const PhoneScreen = () => {
    const {height} = useWindowDimensions();
    const [phoneNumber, setNumber] = useState(null);
    const [phoneSet, setPhone] = useState(false);
    const [verificationCode, setCode] = useState(null);

    const onVerifyButtonPressed = () => {
        // fetch("http://44.206.43.168/api/send_verification_message", {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         tel_number: phoneNumber
        //     }),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // }).then(function(response){ 
        //     return response.json()})
        //     .then(function(data) {
        //         console.log(data)
        //         if (data.status === "Success") {
        //             setPhone(true)
        //         }
        //     }).catch(error => console.error('Error:', error)); 
                        
                        
        setPhone(true)
    }

    const onConfirmButtonPressed = () => {

        // fetch("http://44.206.43.168/api/verify_message", {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         tel_number: phoneNumber,
        //         code: verificationCode
        //     }),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     }
        // }).then(function(response){ 
        //     return response.json()})
        //     .then(function(data) {
        //         if (data.status === "Success") {
                    
        //             navigation.navigate('UserAuth', {number_verified: phoneNumber})
                    
        //         }
        //     }).catch(error => console.error('Error:', error)); 
            
        navigation.navigate('UserAuth', {number_verified: phoneNumber})
    }

    const navigation = useNavigation();
    
    

    return (
        <DismissKeyboard>
            <View style={[styles.root, {height: height}]}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, {height: height * 0.15},]} 
                    resizeMode="contain" 
                />
                <View style={styles.screenContent}>
                    <Text style={styles.headerOne}>Türkiye'nin en gelişmiş kamyoncu platformu </Text>
                    <View style={{flex: 0.8, justifyContent: 'space-between'}}>
                        {phoneSet
                        ?   <View>
                                <Text style={styles.headerTwo}>SMS ile gelen kodu giriniz</Text>
                                <TextInput 
                                    style={styles.phoneInput}
                                    keyboardType= 'phone-pad'
                                    defaultValue={verificationCode}
                                    onChangeText={newCode => setCode(newCode)}
                                />
                            </View>
                        :    <View>
                                <Text style={styles.headerTwo}>Telefon numaranızı giriniz: </Text>
                                <TextInput 
                                    placeholder='(+90553__)'  
                                    style={styles.phoneInput}
                                    keyboardType= 'phone-pad'
                                    defaultValue={phoneNumber}
                                    onChangeText={newNumber => setNumber(newNumber)}
                                />
                            </View>
                        }
                        <View>
                            <Pressable onPress={phoneSet ? onConfirmButtonPressed : onVerifyButtonPressed} style={({pressed}) => [{
                                    backgroundColor: pressed 
                                    ? '#81E47C'
                                    : '#36d42d'
                                },
                                styles.button]}>
                                <Text style={styles.buttonInner}>TAMAM</Text>
                            </Pressable>
                            <Text style={styles.testimonial}>*Kullanıcı sözleşmesini kabul ediyorum</Text>
                        </View>
                    </View>
                </View>
            </View>
        </DismissKeyboard>
        

    );
};

const styles = StyleSheet.create({
    root: {
        height: height * 0.8,
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
        fontSize: Platform.OS === 'ios' ? 22 : 24,
        textAlign: 'center',
        padding: 4,
        fontFamily: 'ProximaNova_Bold',
        fontWeight: "300",
    },
    headerTwo: {
        color: "white",
        fontSize: 18,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "300",
        fontFamily: 'ProximaNova_Bold',
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
        
    },
    buttonInner: {
        color: 'white',
        fontWeight: '600',
        fontSize: 24,
        fontFamily: 'ProximaNova_Bold',
        

    },
    testimonial: {
        color: 'white',
        marginTop: 10,
        fontFamily: 'ProximaNova_Bold',
        textAlign: 'center'

    }
});

export default PhoneScreen;