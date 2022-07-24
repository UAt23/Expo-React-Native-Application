import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, TextInput, ScrollView} from 'react-native';
import VehicleCard from './VehicleCard';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityIndicatorExample from '../../../ActivityIndicator';

const {width, height} = Dimensions.get('window');




const NewCarInfo = () => {
    const navigation = useNavigation();

    const [vehicles, setVehicles] = useState(null)
    const [authKey, setAuth] = useState();
    const [isLoading, setLoading] = useState(true);
    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const printer = async () => {
                let auth = await AsyncStorage.getItem("token").then(userToken => {
                    const state = userToken;
                    return state;
                })
                
                fetch("http://44.206.43.168/api/get_vehicles", {
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
                            setVehicles(data.vehicles)
    
                        }
                    }).catch(error => console.error('Error:', error));
            }

            printer()
        });

        return unsubscribe;
    }, [navigation]);

    const Vehicles = () => {
        let current = [];
        if(vehicles !== null){
            vehicles.filter((vehicle, index) => {
                return current.push(<VehicleCard key={index} data={vehicle}/>)
            })
        } else return(<Text>Kayıtlı Araç Bulunamadı</Text>)
        return current
    }

    const newCarInfo = () => {
        navigation.navigate('AddNewCar', {vehicleId: null, value: {type: "none", pic: null}})
    }
    if (isLoading) {
        return <ActivityIndicatorExample/>
    }
    return (
        <View style={styles.root}>
            <ScrollView style={styles.screenContent}>
                <Vehicles/>               
            </ScrollView>
            <View style={styles.screenButton}>
                <Pressable onPress={newCarInfo} style={({pressed}) => [{
                    backgroundColor: pressed 
                    ? '#8BE686'
                    : '#36d42d'
                }
                ,styles.button]}>
                    <Text style={styles.buttonInner}>Yeni Araç Ekle</Text>
                </Pressable>
            </View>    
        </View>
        )
    
}



const styles = StyleSheet.create ({
    
    root: {
        flexDirection: "column",
        height: height * 0.88,
        width: width,
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#eff0f7",
        paddingTop: 20,
    },
    screenContent: {
        flex: 0.8,
        width: '85%',
        
    },
    headerTwo: {
        color: "#16234e",
        fontSize: 16,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "500",
        fontFamily: 'ProximaNova_Bold'

    },
    text: {
        marginLeft: 10,
        color: '#16234e',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'ProximaNova_Bold'

    },
    screenButton: {
        flex: 0.1,
        justifyContent: 'flex-end',
        width: '80%',
        marginBottom: Platform.OS === 'ios' ? 50 : 0,
        
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
        fontFamily: 'ProximaNova_Bold'

    },
})

export default NewCarInfo;