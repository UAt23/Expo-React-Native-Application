import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch} from "react-redux";

import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, Switch} from 'react-native';

export const SAVE_CAR = "SAVE_CAR";


export const saveCar = (type, pic) => ({
    type: SAVE_CAR,
    payload: {
        type,
        pic
    }
});

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const {width, height} = Dimensions.get('window');



const AddNewCar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const [vehicle, setVehicle] = useState(null)
    const [authKey, setAuth] = useState();
    const [plaka, setPlate] = useState(null);
    const [model, setModel] = useState(null);
    const [year, setYear] = useState(null);
    const [weight, setWeight] = useState(null);
    const [carType, setCarType] = useState(null);
    const [dorse, setDorse] = useState(null);
    const [ruhsat1, setRuhsat1] = useState(false);
    const [ruhsat2, setRuhsat2] = useState(false);
    const [sigorta, setSigorta] = useState(false);
    const [muayene, setMuayene] = useState(false);

    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            
            const printer = async () => {
                let auth = await AsyncStorage.getItem("token").then(userToken => {
                    const state = userToken;
                    return state;
                })
                let ruhsatOn = await AsyncStorage.getItem("ruhsatOn").then(userToken => {
                    const state = userToken;
                    setRuhsat1(true)
                    return state;
                })
                let ruhsatArka = await AsyncStorage.getItem("ruhsatArka").then(userToken => {
                    const state = userToken;
                    setRuhsat2(true)
                    return state;
                })
                let sigorta = await AsyncStorage.getItem("sigorta").then(userToken => {
                    const state = userToken;
                    setSigorta(true)
                    return state;
                })
                let muayene = await AsyncStorage.getItem("muayene").then(userToken => {
                    const state = userToken;
                    setMuayene(true)
                    return state;
                })
                if(route.params.vehicleId){
                    fetch(`http://44.206.43.168/api/get_vehicle_by_id?arac_id=${route.params.vehicleId}`, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json; charset=utf-8',
                            "Authorization": auth
                        }
                    }).then(function(response){ 
                        return response.json()})
                    .then(function(data) {
                        // console.log(data)
                        if (data.status === "Success") {
                            // console.log(data.vehicle)
                            setVehicle(data.vehicle)
                        }
                    }).catch(error => console.error('Error:', error));
                } 
            }

            printer()

        });

        return unsubscribe
    }, [navigation]);
    
    
    // const carInfo = useSelector(state => state.carInfo)
    // console.log(carInfo)
    
    // dispatch(saveCar(route.params.value.type,route.params.value.pic))

    const openCamera = (doc) => {
        let tempDocSelection = doc
        navigation.navigate('CameraComponent', {doc: tempDocSelection})
    }
    
    const sendCar = async () => {
        const loader = async () => {
            let ruhsatOn = await AsyncStorage.getItem("ruhsatOn").then(userToken => {
                const state = userToken;
                setRuhsat1(true)
                return state;
            })
            let ruhsatArka = await AsyncStorage.getItem("ruhsatArka").then(userToken => {
                const state = userToken;
                setRuhsat2(true)
                return state;
            })
            let sigorta = await AsyncStorage.getItem("sigorta").then(userToken => {
                const state = userToken;
                setSigorta(true)
                return state;
            })
            let muayene = await AsyncStorage.getItem("muayene").then(userToken => {
                const state = userToken;
                setMuayene(true)
                return state;
            })
            return [ruhsatOn, ruhsatArka, sigorta, muayene]
        }
        let [ruhsatOn, ruhsatArka, sigorta, muayene] = await loader()
        let checker = [ruhsatOn, ruhsatArka, sigorta, muayene, plaka, model, year, weight, carType, dorse];
        let i = 0
        let formValid = checker.filter((field)=>{
            if (field !== null && field !== undefined) { i++ }
            return i
        })
        console.log(i)

        if (i === 10){
            const printer = async () => {
                let auth = await AsyncStorage.getItem("token").then(userToken => {
                    const state = userToken;
                    return state;
                })
                fetch(`http://44.206.43.168/api/add_vehicle`, {
                            method: 'POST',
                            body: JSON.stringify(
                                {
                                    plaka: plaka,
                                    marka: model,
                                    model: year,
                                    azami_yuk: weight,
                                    arac_tipi: carType,
                                    dorse_tipi: dorse,
                                    ruhsat_1: ruhsatOn,
                                    ruhsat_2: ruhsatArka,
                                    sigorta: sigorta,
                                    muayene: muayene
                                }
                            ),
                            headers: {
                                'Content-type': 'application/json; charset=utf-8',
                                "Authorization": auth
                            }
                        }).then(function(response){ 
                            return response.json()})
                            .then(function(data) {
                                console.log(data)
                                if (data.status === "Success") {
                                }
                            }).catch(error => console.error('Error:', error));
                
            }
            printer()

        }else {
            const flert = () => Alert.alert("UYARI",`Lütfen tüm alanları doldurun!`)
            flert()
        }
        // navigation.navigate('CameraComponent', {doc: tempDocSelection})
    }

    return (
        (
            <DismissKeyboard>
                <ScrollView>
                    <View style={styles.carInfoRoot}>
                        <View style={styles.screenContent}>
                            <View>
                                <Text style={styles.headerTwo}>Araç Plakası</Text>
                                {(route.params.vehicleId && vehicle !== null)
                                    ? (<TextInput style={styles.Input}  
                                        value={vehicle[1]}
                                        onChangeText={newPlate => setPlate(newPlate)}
                                        />)
                                    : (<TextInput style={styles.Input} 
                                        defaultValue={plaka}
                                        onChangeText={newPlate => setPlate(newPlate)}
                                        />)
                                }
                                    
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Araç Markası</Text>
                                {(route.params.vehicleId && vehicle !== null)
                                    ? (<TextInput style={styles.Input}  
                                        value={vehicle[2]} 
                                        onChangeText={newModel => setModel(newModel)}
                                    />)
                                    : (<TextInput style={styles.Input}
                                        defaultValue={model}
                                        onChangeText={newModel => setModel(newModel)}
                                        />)
                                }
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Model Yılı</Text>
                                {(route.params.vehicleId && vehicle !== null)
                                    ? (<TextInput style={styles.Input}  
                                        value={vehicle[3]} 
                                        onChangeText={newYear => setYear(newYear)}
                                        />)
                                    : (<TextInput style={styles.Input} 
                                        defaultValue={year}
                                        onChangeText={newYear => setYear(newYear)}
                                        />)
                                }
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Azami Yüklü Ağırlık(Ton)</Text>
                                {(route.params.vehicleId && vehicle !== null)
                                    ? (<TextInput style={styles.Input}  
                                        value={vehicle[4]} 
                                        onChangeText={newWeight => setWeight(newWeight)}
                                        />)
                                    : (<TextInput style={styles.Input} 
                                        defaultValue={weight}
                                        onChangeText={newWeight => setWeight(newWeight)}
                                        />)
                                }
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Araç Tipi</Text>
                                {(route.params.vehicleId && vehicle !== null)
                                    ? (<TextInput style={styles.Input}  
                                        value={vehicle[5]} 
                                        onChangeText={newCarType => setCarType(newCarType)}
                                        />)
                                    : (<TextInput style={styles.Input} 
                                        defaultValue={carType}
                                        onChangeText={newCarType => setCarType(newCarType)}
                                        />)
                                }
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Dorse Tipi</Text>
                                {(route.params.vehicleId && vehicle !== null)
                                    ? (<TextInput style={styles.Input}  
                                        value={vehicle[6]} 
                                        onChangeText={newDorse => setDorse(newDorse)}
                                        />)
                                    : (<TextInput style={styles.Input} 
                                        defaultValue={dorse}
                                        onChangeText={newDorse => setDorse(newDorse)}
                                        />)
                                }
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Ruhsat</Text>
                                <View style={styles.buttonRows}>
                                    <Pressable  style={[styles.buttonSecond, ruhsat1 ? {backgroundColor: '#8BE686'} : {backgroundColor: 'white'}]}>
                                        {
                                            ruhsat1
                                            ? <Text style={styles.buttonInnerSecond} onPress={() => {openCamera("ruhsat1")}}>Yüklendi</Text>
                                            : <Text style={styles.buttonInnerSecond} onPress={() => {openCamera("ruhsat1")}}>+Sayfa 1 Yükle</Text>
                                        }
                                    </Pressable>
                                    <Pressable  style={[styles.buttonSecond, ruhsat1 ? {backgroundColor: '#8BE686'} : {backgroundColor: 'white'}]}>
                                    {
                                            ruhsat2
                                            ? <Text style={styles.buttonInnerSecond} onPress={() => {openCamera("ruhsat1")}}>Yüklendi</Text>
                                            : <Text style={styles.buttonInnerSecond} onPress={() => {openCamera("ruhsat2")}}>+Sayfa 2 Yükle</Text>
                                        }
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{marginVertical: 10,}}>
                                <View style={styles.buttonRows}>
                                    <Text style={styles.headerTwo}>Sigorta Poliçesi</Text>
                                    <Pressable onPress={() => {openCamera("sigorta")}} style={[styles.buttonSecond, ruhsat1 ? {backgroundColor: '#8BE686'} : {backgroundColor: 'white'}]}>
                                    {
                                            sigorta
                                            ? <Text style={styles.buttonInnerSecond}>Yüklendi</Text>
                                            : <Text style={styles.buttonInnerSecond}>+ Yükle</Text>
                                    }
                                    </Pressable>
                                </View>
                                <View style={styles.buttonRows}>
                                    <Text style={styles.headerTwo}>Muayene</Text>
                                    <Pressable onPress={() => {openCamera("muayene")}} style={[styles.buttonSecond, ruhsat1 ? {backgroundColor: '#8BE686'} : {backgroundColor: 'white'}]}>
                                    {
                                            muayene
                                            ? <Text style={styles.buttonInnerSecond}>Yüklendi</Text>
                                            : <Text style={styles.buttonInnerSecond}>+ Yükle</Text>
                                    }
                                    </Pressable>
                                </View>
                            </View>
                            <View >
                                <Pressable onPress={sendCar} style={({pressed}) => [{
                                            backgroundColor: pressed 
                                            ? '#8BE686'
                                            : '#36d42d'
                                        },
                                    styles.button]}>
                                    <Text style={styles.buttonInner}>TAMAM</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View> 
                </ScrollView>     
            </DismissKeyboard>
        )
    )
}

export default AddNewCar;

const styles = StyleSheet.create({
    carInfoRoot: {
        flexDirection: "column",
        height: height * 1.05,
        width: width,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#eff0f7",
        paddingTop: 20,
    },
    root: {
        height: height,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#eff0f7",
        paddingTop: 10,
    },
    headerOne: {
        color: "#16234e",
        flex: 0.2,
        fontSize: 24,
        textAlign: 'center',
        padding: 4,
        fontWeight: "500",
        fontFamily: 'ProximaNova_Bold'

    },
    headerTwo: {
        color: "#16234e",
        fontSize: 18,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
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
        fontFamily: 'ProximaNova_Bold'

    },
    phoneInput: {
        backgroundColor: "white",
        borderRadius: 12,
        height: 50,
        paddingLeft: 20
    },
    screenContent: {
        flex: 0.8,
        width: '95%',
        
    },
    screenButton: {
        flex: 0.1,
        alignSelf: 'center',
        width: '80%',
        marginTop: Platform.OS === 'ios' ? 20 : 20,
        
        
    },
    button: {
        alignItems: 'center',
        width: "90%",
        borderRadius: 12,
        marginTop: 50,
        marginLeft: 20,
        padding:10
    },
    buttonInner: {
        color: 'white',
        fontWeight: '600',
        fontSize: 24,
        fontFamily: 'ProximaNova_Bold'

        

    },
    Input: {
        backgroundColor: "white",
        borderRadius: 12,
        height: height * 0.06,
        paddingLeft: 20
    },
    buttonSecond: {
        alignItems: 'center',
        width: "45%",
        padding: 10,
        borderRadius: 12,
    },
    buttonInnerSecond: {
        color: '#737378',
        fontWeight: '600',
        fontSize: 12,
        fontFamily: 'ProximaNova_Bold'

    },
    buttonRows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    }

    
})