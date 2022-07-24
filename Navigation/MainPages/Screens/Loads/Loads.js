import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    useWindowDimensions, 
    Pressable, 
    NavigationContainer, 
    ScrollView, 
    ActivityIndicator,
    
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import LoadCard from './LoadCard';
import Inspect from './Inspect';
import Documents from '../Settings/Documents';
import NewCarInfo from '../Settings/NewCarInfo';
import AddNewCar from '../Settings/AddNewCar';
import CameraComponent from "../Settings/Camera"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dimensions } from 'react-native';
import Complete from './Complete';
import ContentLoader from "react-native-easy-content-loader";
import reloadLogo from '../../../../assets/loads/reload.png';
import { saveToken } from "../../../AsyncStorage";
import { useSelector, useDispatch} from "react-redux";


export const UPDATE_NOT_REGISTERED = 'UPDATE_NOT_REGISTERED';


export const notRegistered = () => ({
    type: UPDATE_NOT_REGISTERED

})


const {width, height} = Dimensions.get('window');
const Load = createStackNavigator();

const LoadCards = () => {
    const cities = [
        { label: 'Hepsi', value: 'Hepsi' },
        { label: 'Konumumu Kullan', value: 'Konum' },
        { label: 'Adana', value: 'Adana' },
        { label: 'Adıyaman', value: 'Adıyaman' },
        { label: 'Afyonkarahisar', value: 'Afyonkarahisar' },
        { label: 'Ağrı', value: 'Ağrı' },
        { label: 'Amasya', value: 'Amasya' },
        { label: 'Ankara', value: 'Ankara' },
        { label: 'Antalya', value: 'Antalya' },
        { label: 'Artvin', value: 'Artvin' },
        { label: 'Aydın', value: 'Aydın' },
        { label: 'Balıkesir', value: 'Balıkesir' },
        { label: 'Bilecik', value: 'Bilecik' },
        { label: 'Bingöl', value: 'Bingöl' },
        { label: 'Bitlis', value: 'Bitlis' },
        { label: 'Bolu', value: 'Bolu' },
        { label: 'Burdur', value: 'Burdur' },
        { label: 'Bursa', value: 'Bursa' },
        { label: 'Çanakkale', value: 'Çanakkale' },
        { label: 'Çankırı', value: 'Çankırı' },
        { label: 'Çorum', value: 'Çorum' },
        { label: 'Denizli', value: 'Denizli' },
        { label: 'Diyarbakır', value: 'Diyarbakır' },
        { label: 'Edirne', value: 'Edirne' },
        { label: 'Elazığ', value: 'Elazığ' },
        { label: 'Erzincan', value: 'Erzincan' },
        { label: 'Erzurum', value: 'Erzurum' },
        { label: 'Eskişehir', value: 'Eskişehir' },
        { label: 'Gaziantep', value: 'Gaziantep' },
        { label: 'Giresun', value: 'Giresun' },
        { label: 'Gümüşhane', value: 'Gümüşhane' },
        { label: 'Hakkari', value: 'Hakkari' },
        { label: 'Hatay', value: 'Hatay' },
        { label: 'Isparta', value: 'Isparta' },
        { label: 'Mersin', value: 'Mersin' },
        { label: 'İstanbul', value: 'İstanbul' },
        { label: 'İzmir', value: 'İzmir' },
        { label: 'Kars', value: 'Kars' },
        { label: 'Kastamonu', value: 'Kastamonu' },
        { label: 'Kayseri', value: 'Kayseri' },
        { label: 'Kırklareli', value: 'Kırklareli' },
        { label: 'Kırehir', value: 'Kırehir' },
        { label: 'Kocaeli', value: 'Kocaeli' },
        { label: 'Konya', value: 'Konya' },
        { label: 'Kütahya', value: 'Kütahya' },
        { label: 'Malatya', value: 'Malatya' },
        { label: 'Manisa', value: 'Manisa' },
        { label: 'Kahramanmaraş', value: 'Kahramanmaraş' },
        { label: 'Mardin', value: 'Mardin' },
        { label: 'Muğla', value: 'Muğla' },
        { label: 'Muş', value: 'Muş' },
        { label: 'Nevşehir', value: 'Nevşehir' },
        { label: 'Niğde', value: 'Niğde' },
        { label: 'Ordu', value: 'Ordu' },
        { label: 'Rize', value: 'Rize' },
        { label: 'Sakarya', value: 'Sakarya' },
        { label: 'Samsun', value: 'Samsun' },
        { label: 'Siirt', value: 'Siirt' },
        { label: 'Sinop', value: 'Sinop' },
        { label: 'Sivas', value: 'Sivas' },
        { label: 'Tekirdağ', value: 'Tekirdağ' },
        { label: 'Tokat', value: 'Tokat' },
        { label: 'Trabzon', value: 'Trabzon' },
        { label: 'Tunceli', value: 'Tunceli' },
        { label: 'Şanlıurfa', value: 'Şanlıurfa' },
        { label: 'Uşak', value: 'Uşak' },
        { label: 'Van', value: 'Van' },
        { label: 'Yazgat', value: 'Yazgat' },
        { label: 'Zonguldak', value: 'Zonguldak' },
        { label: 'Aksaray', value: 'Aksaray' },
        { label: 'Bayburt', value: 'Bayburt' },
        { label: 'Karaman', value: 'Karaman' },
        { label: 'Kırıkkale', value: 'Kırıkkale' },
        { label: 'Batman', value: 'Batman' },
        { label: 'Şırnak', value: 'Şırnak' },
        { label: 'Bartın', value: 'Bartın' },
        { label: 'Ardahan', value: 'Ardahan' },
        { label: 'Iğdır', value: 'Iğdır' },
        { label: 'Yalova', value: 'Yalova' },
        { label: 'Karabük', value: 'Karabük' },
        { label: 'Kiils', value: 'Kiils' },
        { label: 'Osmaniye', value: 'Osmaniye' },
        { label: 'Düzce', value: 'Düzce' },
    ]

    const [authKey, setAuth] = useState();
    
    useEffect(() => {

        const printer = async () => {
            let auth = await AsyncStorage.getItem("token").then(userToken => {
                const state = userToken;
                return state;
            })
            console.log(auth)
            setAuth(auth)

        }
        printer()
    }, []);


    ///////////////////////////////////////////
    /////// TO LOGOUT/////////////////////////

    // const dispatch = useDispatch()

    // dispatch(notRegistered())
    
    ///////////////////////////////////////////
    //////////////////////////////////////////
    
    useEffect(() => {
        const fetchData = async () => {
            const printer = async () => {
                let auth = await AsyncStorage.getItem("token").then(userToken => {
                    const state = userToken;
                    return state;
                })
                fetch("http://44.206.43.168/api/get_all_adverts", {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        "Authorization": "auth-key"
                    }
                }).then(function(response){ 
                    return response.json()})
                    .then(function(data) {
                        setLoading(false)
                        if (data.status === "Success") {
                            // console.log(data.adverts)
                            setAdverts(data.adverts)
                        }
                }).catch(error => console.error('Error:', error));
                
                fetch("http://44.206.43.168/api/get_offers_by_user_id", {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json; charset=utf-8',
                            "Authorization": auth
                        }
                }).then(function(response){ 
                    return response.json()})
                    .then(function(data) {
                        if (data.status === "Success") {
                            setOffers(data.offers)
                            setLoading(false)
                    }
                    }).catch(error => console.error('Error:', error));
            }
            printer()
        };
        
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        const id = setInterval(() => {
            fetchData();
        }, 20000);
        
        fetchData();

        return () => {
            unsubscribe
            clearInterval(id)
        };
    }, [navigation]);

    const [isLoading, setLoading] = useState(true);
    const [adverts, setAdverts] = useState([]);
    const [filter, setFilter] = useState("Hepsi");
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);
    const [offers, setOffers] = useState(null);

    const getAdverts = () => {

        fetch("http://44.206.43.168/api/get_all_adverts", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    "Authorization": "auth-key"
                }
            }).then(function(response){ 
                return response.json()})
                .then(function(data) {
                    setLoading(false)
                    if (data.status === "Success") {
                        // console.log(data.adverts)
                        setAdverts(data.adverts)
                    }
                }).catch(error => console.error('Error:', error)); 
    }


////////////////////////FILTER/////////////////////////////
//////////////////////////////////////////////////////////
    

    const FilteredLoads = () => {
        let current = []
        let offeredAdverts 
        if (offers !== null && adverts !== null ) {
            adverts.filter((advert, index, temp) => {
                offers.forEach((offer) => {
                    if (offer[1] === advert[0]){
                        // console.log(advert[0], offer[1])
                        if(advert[0] === temp[index][0]) {
                            // console.log(advert[0], temp[index][0])

                            temp.splice(index, 1)
                        }
                    }
                    
                })
                // console.log(temp)
                
            })
        }
        // console.log(adverts)
        if (filter==="Hepsi" && adverts !== null && adverts.length !== 0) {
            adverts.filter(load => {
                return  current.push(<LoadCard key={load[0]} data={load}/>)
            })
        }else if (filter===location && adverts !== null && adverts.length !== 0) {
            adverts.filter(load => {
                if (load[2] === location){
                    return current.push(<LoadCard key={load[0]} data={load}/>)
                } 
                return(<Text>Hiç ilan bulunamadı</Text>)
            })

        }else if (filter!==location && adverts !== null && adverts.length !== 0) {
            adverts.filter(load => {
                if (load[2] === filter){
                    return current.push(<LoadCard key={load[0]} data={load}/>)
                } 
                return(<Text>Hiç ilan bulunamadı</Text>)
            })

        }else if (adverts.length === 0) {
            return (<Text>Teklif vermedğiniz ilan bulunamadı</Text>)
        } else return (<Text>Hiç ilan bulunamadı</Text>)

        return current
    }

//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

    const getLocation = async (value) => {
        
        
        if (value === 'Konum' ) {
            (async () => {
                let { statusLocation } = await Location.requestForegroundPermissionsAsync();
                if (statusLocation !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                }
                const locationGot = await Location.getCurrentPositionAsync({accuracy: 3});
                const address = await Location.reverseGeocodeAsync(locationGot.coords);
                setLocation(address[0]["region"]);
                setFilter(address[0]["region"]);
                
            })();
        } else setFilter(value);
    }



    

    const navigation = useNavigation();

    const route = useRoute();

    // const printer = async () => {
    //     let auth = await AsyncStorage.getItem("token")
    //     console.log(auth)

    // }
    // printer()

    if (isLoading) {
        return(
            <SafeAreaView>
                <View style={styles.loadsContainer}>
                    <ContentLoader active loading tHeight={"0%"} pRows={4} pWidth={"100%"}  pHeight={"22%"} />
                </View>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView  style={{backgroundColor: '#eff0f7',}}>
    
                    <View style={styles.filter}>
                        <Pressable style={{marginBottom:5}} onPress={() => getAdverts()}>
                            <Image 
                                source={reloadLogo} 
                                style={styles.logos} 
                                resizeMode="contain" 
                            />
                        </Pressable>
                        <RNPickerSelect
                            style={styles.picker}
                            useNativeAndroidPickerStyle={true}
                            
                            onValueChange={(value) => {
                                getLocation(value);
                            }}
                            items={cities}
                        >
                            { filter === null 
                            ? <Text style={styles.text} >Çıkış bölgesine göre sırala: Hepsi</Text>
                            : <Text style={styles.text} >Çıkış bölgesine göre sırala: {filter}</Text>
                            }
                        </RNPickerSelect>
                    </View>
                <ScrollView>
                    <View style={styles.loadsContainer}>
                        <FilteredLoads />
                        {/* <LoadCard data={adverts}/> */}
                        
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
        
    }

    }

const LoadsScreen = ({navigation}) => {
    return(
            <SafeAreaProvider>

                <Load.Navigator>
                    <Load.Screen
                        name="LoadCards"
                        component={LoadCards}
                        options={{headerShown: false}}
                    />
                    <Load.Screen
                        name="Inspect"
                        component={Inspect}
                        options={{headerShown: true, 
                            headerStyle: {backgroundColor: '#16234e', height: Platform.OS === 'ios' ? height * 0.09 : height * 0.07,}, 
                            headerTitleStyle: {color: 'white'},
                            headerTintColor: 'white',
                            title: 'İlan İncele',
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontSize: 18,
                                fontWeight: '600',
                                color: 'white',
                                textAlign: 'center',
                                fontFamily: 'ProximaNova_Bold'
                            },
                            headerBackTitleVisible: false
                        }}
                    />
                    <Load.Screen
                        name="Complete"
                        component={Complete}
                        options={{headerShown: true, 
                            headerStyle: {backgroundColor: '#16234e', height: Platform.OS === 'ios' ? height * 0.09 : height * 0.07,}, 
                            headerTitleStyle: {color: 'white'},
                            headerTintColor: 'white',
                            title: 'Üye Kaydı Tamamlı ',
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontSize: 18,
                                fontWeight: '600',
                                color: 'white',
                                textAlign: 'center',
                                fontFamily: 'ProximaNova_Bold'
                            },
                            headerBackTitleVisible: false
                        }}
                    />
                    <Load.Screen
                        name="NewCarInfo"
                        component={NewCarInfo}
                        options={{headerShown: true, 
                            headerStyle: {backgroundColor: '#16234e', height: Platform.OS === 'ios' ? height * 0.09 : height * 0.07,}, 
                            headerTitleStyle: {color: 'white'},
                            headerTintColor: 'white',
                            title: 'Araç Bilgileri',
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontSize: 18,
                                fontWeight: '600',
                                color: 'white',
                                textAlign: 'center',
                                fontFamily: 'ProximaNova_Bold'
                            },
                            headerBackTitleVisible: false
                        }}
                    />
                    <Load.Screen
                        name="AddNewCar"
                        component={AddNewCar}
                        options={{headerShown: true, 
                            headerStyle: {backgroundColor: '#16234e', height: Platform.OS === 'ios' ? height * 0.09 : height * 0.07,}, 
                            headerTitleStyle: {color: 'white'},
                            headerTintColor: 'white',
                            title: 'Yeni Araç Ekle ',
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontSize: 18,
                                fontWeight: '600',
                                color: 'white',
                                textAlign: 'center',
                                fontFamily: 'ProximaNova_Bold'
                            },
                            headerBackTitleVisible: false
                        }}
                    />
                    <Load.Screen
                        name="CameraComponent"
                        component={CameraComponent}
                        options={{headerShown: false}}
                    />
                </Load.Navigator>
            </SafeAreaProvider>
        
    )
}

const styles = StyleSheet.create({
    loadsContainer: {
        height: "auto",
        alignItems: 'center', 
        backgroundColor: '#eff0f7',
        padding: 20,
        paddingTop: 2,
    },
    spinnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.89,
        
    },  
    filter: {
        backgroundColor: '#eff0f7',
        flexDirection: 'row',
        // justifyContent: 'center',
        marginLeft: width * 0.04,
        marginTop: Platform.OS === 'ios' ? 30 : 30,
        


    },
    logos: {
        height: 22,
        width: 40,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#16234e',
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'ProximaNova_Bold'

    },
    picker: {
        alignItems: 'center',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    }
})

export default LoadsScreen;