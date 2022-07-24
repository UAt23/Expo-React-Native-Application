import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, NavigationContainer, ScrollView,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProposalCard from './ProposalCard';
import Inspect from '../Loads/Inspect';
import NewCarInfo from '../Settings/NewCarInfo';
import AddNewCar from '../Settings/AddNewCar';
import CameraComponent from "../Settings/Camera"
import Complete from '../Loads/Complete';
import AsyncStorage from '@react-native-async-storage/async-storage'


import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ContentLoader from "react-native-easy-content-loader";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const {width, height} = Dimensions.get('window');

const ProposalNav = createStackNavigator();


const Content = () => { 
    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setLoading] = useState(true);
    const [offers, setOffers] = useState(null);
    const [adverts, setAdverts] = useState([]);
    
    

    useEffect(() => {
        
        const fetchData = async () => {
            const printer = async () => {
                let auth = await AsyncStorage.getItem("token").then(userToken => {
                    const state = userToken;
                    return state;
                })
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
                fetch("http://44.206.43.168/api/get_all_adverts", {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        "Authorization": auth
                    }
                }).then(function(response){ 
                    return response.json()})
                    .then(function(data) {
                        if (data.status === "Success") {
                            // console.log(data.adverts)
                            setAdverts(data.adverts)
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
        }, 30000);
        
        fetchData();

        return () => {
            unsubscribe
            clearInterval(id)
        };
    }, [navigation]);


    const FilteredLoads = () => {
        let current = []

            if (offers !== null ) {
                offers.filter((offer, index) => {
                    adverts.filter((advert) => {
                        if (advert[0] === offer[1]){
                            return current.push(<ProposalCard key={index} data={advert}/>)
                        }
                    })
                })
            }else return (<Text>Hiç ilan bulunamadı</Text>)
        return current
    }

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
            <SafeAreaView>
    
                <ScrollView>
                    <View style={styles.loadsContainer}>
                        <FilteredLoads/>
                        
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
        
    }
}

const MyProposalsScreen = ({navigation}) => {
    return(
        <SafeAreaProvider>

            <ProposalNav.Navigator>
                <ProposalNav.Screen
                    name="Content"
                    component={Content}
                    options={{headerShown: false}}
                />
                <ProposalNav.Screen
                    name="CameraComponent"
                    component={CameraComponent}
                    options={{headerShown: false}}
                />
                <ProposalNav.Screen
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
                <ProposalNav.Screen
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
                <ProposalNav.Screen
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
                <ProposalNav.Screen
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
            </ProposalNav.Navigator>
        </SafeAreaProvider>
        
        
    )
}

export default MyProposalsScreen;

const styles = StyleSheet.create({
    loadsContainer: {
        height: "auto",
        alignItems: 'center', 
        backgroundColor: '#eff0f7',
        padding: 20,
        paddingTop: 20,
    },
    spinnerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.89,
        
    },  
    filter: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',


    },
    logos: {
        height: 25,
        width: 40,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#16234e',
        marginBottom: 20,
        textAlign: 'center',

    },
    picker: {
        alignSelf: 'flex-end',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    }
});