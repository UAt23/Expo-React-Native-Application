import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, KeyboardAvoidingView, Alert, Modal, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dimensions } from 'react-native';
import ActivityIndicatorExample from '../../../ActivityIndicator';

import modalLogo from '../../../../assets/loads/modal.png';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const {width, height} = Dimensions.get('window');


const Inspect = () => {
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const route = useRoute();
    const [code, setCode] = React.useState('');
    const [advert, setAdvert] = useState([null]);
    const [offer, setOffer] = useState(null);
    const [givenOffer, setGivenOffer] = useState(null);
    const [statuses, setStatuses] = useState([null]);
    const [isDocuments ,setIsDocuments] = useState(true)//Change back to false
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const [authKey, setAuth] = useState();

    useEffect(() => {

        const fetchData = async () => {
            const printer = async () => {
                let auth = await AsyncStorage.getItem("token").then(userToken => {
                    const state = userToken;
                    return state;
                })
                setAuth(auth)
                if(route.params.given){
                    fetch(`http://44.206.43.168/api/get_advert_by_id?ilan_id=${route.params.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json; charset=utf-8',
                            "Authorization": auth
                        }
                    }).then(function(response){ 
                        return response.json()})
                        .then(function(data) {
                            if (data.status === "Success") {
                                setAdvert(data.advert)
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
                            data.offers.filter(offer => {
                                if (offer[1] == route.params.id) {
                                    
                                    fetch(`http://44.206.43.168/api/get_offer_by_id?teklif_id=${offer[0]}`, {
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
                                            console.log(data.offer)
                                            data.offer[1] == route.params.id ? setGivenOffer(data.offer[3]) : setGivenOffer(null)
                                            
                                        }
                                    }).catch(error => console.error('Error:', error));
                                }
                                
                            })
                        }
                        }).catch(error => console.error('Error:', error));
                } else {
                    fetch(`http://44.206.43.168/api/get_advert_by_id?ilan_id=${route.params.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json; charset=utf-8',
                            "Authorization": auth
                        }
                    }).then(function(response){ 
                        return response.json()})
                        .then(function(data) {
                            if (data.status === "Success") {
                                setAdvert(data.advert)
                                setLoading(false)
                            }
                    }).catch(error => console.error('Error:', error));
                }

                    
                fetch(`http://44.206.43.168/api/get_user_documents_statuses`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    "Authorization": authKey
                }
                }).then(function(response){ 
                    return response.json()})
                    .then(function(data) {
                        if (data.status === "Success") {
                            setStatuses(data.document_statuses)
                        }
                }).catch(error => console.error('Error:', error));
            }
            
            printer()
        };

        const unsubscribe = navigation.addListener('focus', () => {
            
            fetchData()

            
            
        });
        
        const id = setInterval(() => {
            fetchData();
        }, 20000);
        

        return () => {
            unsubscribe
            clearInterval(id)
        };
    }, [navigation]);
    //TODO IS LOADING
    //TODO RELOAD AFTER onUpdateOfferPressed

    let countValid = 0;
    statuses.filter(status => {
        if (status === 2) {
            countValid += 1;
        } 
        if (countValid === 7){
            setIsDocuments(true)
        }

    })     


    const onGiveOfferPressed = () => {
        Keyboard.dismiss()
        navigation.navigate('LoadCards')
        fetch(`http://44.206.43.168/api/add_offer`, {
            method: 'POST',
                    body: JSON.stringify({
                        ilan_id: route.params.id,
                        teklif_miktari: offer
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        "Authorization": authKey
                    }
                }).then(function(response){ 
                    return response.json()})
                    .then(function(data) {
                        console.log(data)
                        if (data.status === "Success") {
                        }
                    }).catch(error => console.error('Error:', error));
    };
    const onUpdateOfferPressed = () => {
        Keyboard.dismiss()
        navigation.navigate('Content')
        fetch(`http://44.206.43.168/api/update_offer`, {
                    method: 'POST',
                    body: JSON.stringify({
                        ilan_id: route.params.id,
                        teklif_miktari: offer
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=utf-8',
                        "Authorization": authKey
                    }
                }).then(function(response){ 
                    return response.json()})
                    .then(function(data) {
                        console.log(data)
                        if (data.status === "Success") {
                        }
                    }).catch(error => console.error('Error:', error));
    };
    if (isLoading) {
        return <ActivityIndicatorExample/>
    }
    return (
        <SafeAreaView >

            <DismissKeyboard>

                <KeyboardAvoidingView 
                    behavior='position'
                    style={{paddingBottom: 100}}>
                    <View style={[styles.root, {height: height * 0.85}]}>
                        <View style={styles.screenContent}>
                            <View style={{flex: 0.99, justifyContent: 'space-between', flexDirection: 'row', width: width * 0.9}}>
                                <View style={{justifyContent: 'space-between'}}>
                                    <Text style={styles.headerTwo}>Çıkış Adres: </Text>
                                
                                    <Text style={styles.headerTwo}>Varış Adres: </Text>
                                
                                    <Text style={styles.headerTwo}>Yük Tipi: </Text>
                                
                                    <Text style={styles.headerTwo}>Yük Ağırlığı: </Text>

                                    <Text style={styles.headerTwo}>Araç Tipi: </Text>

                                    <Text style={styles.headerTwo}>Dorse Tipi: </Text>

                                    <Text style={styles.headerTwo}>Hacim: </Text>

                                    <Text style={styles.headerTwo}>En düşük teklif:  </Text>
                                    {givenOffer !== null
                                        ? (
                                            <Text style={styles.headerTwo}>Sizin son teklifiniz:</Text>
                                        )
                                        : <></>
                                    }
                                </View>
                                <View style={{justifyContent: 'space-between'}}>
                                    <Text style={styles.headerTwo}>{advert[2]}</Text>
                                    <Text style={styles.headerTwo}>{advert[3]}</Text>
                                    <Text style={styles.headerTwo}>{advert[4]}</Text>
                                    <Text style={styles.headerTwo}>{advert[5]}</Text>                           
                                    <Text style={styles.headerTwo}>{advert[6]}</Text>                           
                                    <Text style={styles.headerTwo}>{advert[7]}</Text>                           
                                    <Text style={styles.headerTwo}>{advert[8]}</Text>                           
                                    <Text style={styles.headerTwo}>{advert[9]} TL</Text>                           
                                    {givenOffer !== null
                                        ? (
                                            <Text style={styles.headerTwo}>{givenOffer} TL</Text>
                                        )
                                        : <></>
                                    }
                                </View>
                            </View>
                            {givenOffer !== null
                                ? (
                                    <Text style={styles.testimonial}>**Teklifiniz firmaya iletilmiştir. Kabul edildiği takdirde sizinle iletişime geçilecektir.</Text>
                                )
                                : <></>
                            }
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Image 
                                            source={modalLogo} 
                                            style={styles.logos} 
                                            resizeMode="contain" 
                                        />
                                        <Text style={styles.modalText}>Kaydınızı tamamlamanız gerekmektedir.</Text>
                                        <Pressable
                                            style={({pressed}) => [{
                                                backgroundColor: pressed 
                                                ? '#8BE686'
                                                : '#36d42d'
                                            },
                                                styles.buttonModal, styles.button]}
                                            onPress={() => {
                                                navigation.navigate('Complete')
                                                setModalVisible(!modalVisible)
                                            }}
                                        >
                                            <Text style={styles.textStyle}>Üye Kaydı Tamamla</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={{marginBottom: Platform.OS === 'ios' ? 40 : 0}}>
                            <View style={styles.offer}>
                                <TextInput  
                                    style={styles.phoneInput}
                                    keyboardType= 'number-pad'
                                    onChangeText={newOffer => setOffer(newOffer)}
                                />
                                <Text style={styles.headerThree}>**Bu ilana 2 teklif verilmiştir. En düşük teklif {advert[9]}TL.</Text>
                            </View>
                            <View style={styles.offer}>
                                <Pressable onPress={() => {
                                        isDocuments 
                                        ? (givenOffer != null ? onUpdateOfferPressed() : onGiveOfferPressed())
                                        : setModalVisible(true)
                                    }} style={({pressed}) => [{
                                        backgroundColor: pressed 
                                        ? '#8BE686'
                                        : '#36d42d'
                                    },styles.button]}>
                                    {givenOffer != null
                                        ? (
                                            <View>
                                                <Text style={styles.buttonInner}>Teklif Güncelle</Text>
                                            </View>
                                        )
                                        : <Text style={styles.buttonInner}>Teklif Ver</Text>
                                    }
                                    
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </DismissKeyboard>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#eff0f7",
        
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
        flex: 0.79,
        justifyContent: 'space-between',
        width: '100%',
        
    },
    logos: {
        height: 82,
        width:80,
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
    testimonial: {
        color: 'white',
        marginTop: 10,
        fontFamily: 'ProximaNova_Bold'

    },
    offer: {
        paddingLeft: 40,
        paddingRight: 40,

    },
    //MODAL STYLE
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(44,55,95,0.9)',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 100,
            height: 102
        },
        shadowOpacity: 1,
        shadowRadius: 400,
        elevation: 5
    },
    buttonModal: {
        borderRadius: 12,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 40,
        paddingLeft: 40,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "700",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        paddingRight: 40,
        paddingLeft: 40,
        fontSize: 18,
        textAlign: "center"
    },
    testimonial: {
        color: '#16234e',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 10,
        paddingLeft: 15,

    }
    
})

export default Inspect;