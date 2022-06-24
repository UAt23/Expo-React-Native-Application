import * as React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/registeration/kamyongo_logo.png';



const PhoneScreen = () => {
    const {height} = useWindowDimensions();

    const onButtonPressed = () => {
        navigation.navigate('ConfirmationCode')
    }

    const navigation = useNavigation();
    
    return (
        <View style={[styles.root, {height: height}]}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.15},]} 
                resizeMode="contain" 
            />
            <View style={styles.screenContent}>
                <Text style={styles.headerOne}>Türkiye'nin en gelişmiş kamyoncu platformu </Text>
                <View style={{flex: 0.8, justifyContent: 'space-between'}}>
                    <View>
                        <Text style={styles.headerTwo}>Telefon numaranızı giriniz: </Text>
                        <TextInput 
                            placeholder='(0553__)'  
                            style={styles.phoneInput}
                            keyboardType= 'number-pad'
                        />
                    </View>
                    <View>
                        <Pressable onPress={onButtonPressed} style={styles.button}>
                            <Text style={styles.buttonInner}>TAMAM</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
        

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
        fontSize: Platform.OS === 'ios' ? 22 : 24,
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

export default PhoneScreen;