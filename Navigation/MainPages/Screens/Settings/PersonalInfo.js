import * as React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';

const {width, height} = Dimensions.get('window');

const PersonalInfo = () => {
    return (
        <View style={[styles.root]}>
                <View style={styles.screenContent}>
                    <View style={{flex: 0.50, justifyContent: 'space-between'}}>
                        <View >
                            <Text style={styles.headerTwo}>İsim:</Text>
                        </View>
                        <View>
                            <Text style={styles.headerTwo}>Soyisim:</Text>
                        </View>
                        <View>
                            <Text style={styles.headerTwo}>Telefon No:</Text>
                        </View>
                        <View>
                            <Text style={styles.headerTwo}>TC no:</Text>
                        </View>
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: height,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#eff0f7",
        paddingTop: 20,
    },
    headerOne: {
        color: "#16234e",
        flex: 0.2,
        fontSize: 24,
        textAlign: 'center',
        padding: 4,
        fontWeight: "500",
    },
    headerTwo: {
        color: "#16234e",
        fontSize: 18,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "500",
    },
    headerThree: {
        color: "#16234e",
        fontSize: 12,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "500",
        textAlign: 'center',
    },
    phoneInput: {
        backgroundColor: "white",
        borderRadius: 12,
        height: 50,
        paddingLeft: 20
    },
    screenContent: {
        flex: 0.5,
        justifyContent: 'space-between',
        width: '95%',
        
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

    },
    offer: {
        paddingLeft: 40,
        paddingRight: 40,

    }
    
})

export default PersonalInfo

