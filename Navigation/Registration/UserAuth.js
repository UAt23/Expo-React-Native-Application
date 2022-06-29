import * as React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

import Logo from '../../assets/registeration/kamyongo_logo.png';

const UserAuth = () => {
    const {height} = useWindowDimensions();


    const onButtonPressed = () => {
        navigation.navigate('MainContainer')
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
                    <View style={styles.inputFields}>
                        <View>
                            <Text style={styles.headerTwo}>İsim </Text>
                            <TextInput  style={styles.phoneInput}/>
                        </View>
                        <View>
                            <Text style={styles.headerTwo}>Soyisim </Text>
                            <TextInput  style={styles.phoneInput}/>
                        </View>
                        <View>
                            <Text style={styles.headerTwo}>TC No </Text>
                            <TextInput  
                                style={styles.phoneInput}
                                keyboardType= 'number-pad'
                            />
                        </View>
                    </View>
                    <View>
                        <Pressable onPress={onButtonPressed} style={styles.button}>
                            <Text style={styles.buttonInner}>BAŞLA</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </DismissKeyboard>
        

    );
}

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
        fontSize: 24,
        textAlign: 'center',
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
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
        paddingLeft: 20,
        marginBottom: 10,
    },
    screenContent: {
        flex: 0.8,
        justifyContent: 'space-between',
        width: '80%',
        
    },
    inputFields: {
        
    },
    button: {
        backgroundColor: '#36d42d',
        alignItems: 'center',
        width: "100%",
        padding: 10,
        borderRadius: 12,
        
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

export default UserAuth