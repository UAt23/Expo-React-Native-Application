import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityIndicatorExample from '../../../ActivityIndicator';


const {width, height} = Dimensions.get('window');

const PersonalInfo = () => {

    const navigation = useNavigation();
    const [userInfo, setUserrInfo] = useState([null]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const printer = async () => {
                let auth = await AsyncStorage.getItem("token").then(userToken => {
                    const state = userToken;
                    return state;
                })
                fetch("http://44.206.43.168/api/get_personal_info", {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json; charset=utf-8',
                            "Authorization": auth
                        }
                    }).then(function(response){ 
                        return response.json()})
                        .then(function(data) {
                            setLoading(false)
                            if (data.status === "Success") {
                                console.log(data.personal_info)
                                setUserrInfo(data.personal_info)
                            }
                        }).catch(error => console.error('Error:', error));
            }

            printer()
        });

        return unsubscribe;
    }, [navigation]);

    if (isLoading) {
        return <ActivityIndicatorExample/>
    }
    return (
        <View style={[styles.root]}>
                <View style={styles.screenContent}>
                    <View style={{flex: 0.50, justifyContent: 'space-between', flexDirection: 'row', width: width * 0.9}}>
                        <View style={{justifyContent: 'space-between'}}>
                            <Text style={styles.headerTwo}>İsim:</Text>
                            <Text style={styles.headerTwo}s>Soyisim:</Text>
                            <Text style={styles.headerTwo}s>Telefon No:</Text>
                            <Text style={styles.headerTwo}s>TC no:</Text>                            
                        </View>
                        <View style={{justifyContent: 'space-between'}}>
                            <Text style={styles.headerTwo}>{userInfo[1]}</Text>
                            <Text style={styles.headerTwo}>{userInfo[2]}</Text>
                            <Text style={styles.headerTwo}>{userInfo[4]}</Text>
                            <Text style={styles.headerTwo}>{userInfo[3]}</Text>                           
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
        marginVertical: 5,
        fontWeight: "500",
        fontFamily: 'ProximaNova_Bold'

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

