import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityIndicatorExample from '../../../ActivityIndicator';


const {width, height} = Dimensions.get('window');

const Complete = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [statuses, setStatuses] = useState([null]);
    const [authKey, setAuth] = useState();
    const [isLoading, setLoading] = useState(true);
    
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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const printer = async () => {
                let auth = await AsyncStorage.getItem("token").then(userToken => {
                    const state = userToken;
                    return state;
                })
                fetch(`http://44.206.43.168/api/get_user_documents_statuses`, {
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
                            setStatuses(data.document_statuses)
                        }
                }).catch(error => console.error('Error:', error));
                
            }

            printer()

        });

        return unsubscribe;
    }, [navigation]);

    const openCamera = (doc) => {
        let tempDocSelection = doc
        navigation.navigate('CameraComponent', {doc: tempDocSelection})
    }

    let statusText = []
    let statusStyle = []
    statuses.filter(status => {
        if (status === 1) {
            statusText.push("Onay Bekliyor")
            statusStyle.push(styles.statusTextOrange)
        }else if (status === 2) {
            statusText.push("Kabul Edildi")
            statusStyle.push(styles.statusTextGreen)
        } else {
            statusText.push("Yüklenmedi")
            statusStyle.push(styles.statusText)
            
        }

    })     

    const carPage = () => {
        navigation.navigate('NewCarInfo')
    }

    const newCarPage = () => {
        navigation.navigate('AddNewCar')
    }
    if (isLoading) {
        return <ActivityIndicatorExample/>
    }
    return (
        <View style={styles.root}>
            <View>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.sectionHeader}>Kişisel Belgeler</Text>
                    <View style={styles.container}>
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Ehliyet Ön Yüz</Text>
                            <Text style={statusStyle[0]} >{statusText[0]}</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Ehliyet Arka Yüz</Text>
                            <Text style={statusStyle[1]} >{statusText[1]}</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Psikoteknik</Text>
                            <Text style={statusStyle[2]} >{statusText[2]}</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >SRC</Text>
                            <Text style={statusStyle[3]} >{statusText[3]}</Text>
                        </Pressable>
                    </View>
                </View>    
                <View>
                    <Text style={styles.sectionHeader}>Firma Belgeleri</Text>
                    <View style={styles.container}>
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Fatura Örneği</Text>
                            <Text style={statusStyle[4]} >{statusText[4]}</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Yetki Belgesi</Text>
                            <Text style={statusStyle[5]} >{statusText[5]}</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Vergi Levhası</Text>
                            <Text style={statusStyle[6]} >{statusText[6]}</Text>
                        </Pressable>
                    </View>
                </View> 
                <View>
                    <Pressable onPress={carPage} >
                        <Text style={styles.textBottom} >Araç Belgeleri</Text>
                    </Pressable>
                    <Pressable onPress={newCarPage} >
                        <Text style={styles.textBottom} >Yeni Araç</Text>
                    </Pressable>
                </View>
            </View >
            <View style={styles.screenButton}>
                <Pressable  style={styles.button}>
                    <Text style={styles.buttonInner}>Gönder</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Complete

const styles = StyleSheet.create ({
    root: {
        flexDirection: "column",
        height: height * 0.89,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#eff0f7",
        paddingTop: 20,
    },
    container: {
        width: width * 0.9,
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingLeft: 10,
        paddingRight: 0,
        paddingTop: 5,
        paddingBottom: 5,
        marginVertical: 5,
        
    },
    innerLines: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: 10,


    },
    
    text: {
        marginLeft: 10,
        color: '#16234e',
        fontSize: 16,
        fontFamily: 'ProximaNova_Bold',
        fontWeight: '600',
    },
    textBottom: {
        marginLeft: 10,
        color: 'gray',
        fontSize: 22,
        fontFamily: 'ProximaNova_Bold',
        fontWeight: '700',
        marginVertical: 5,
    },
    sectionHeader: {
        marginLeft: 20,
        color: '#737378',
        fontSize: 16,
        fontFamily: 'ProximaNova_Bold',
        fontWeight: '600',
    },
    statusText: {
        marginRight: 15,
        color: '#737378',
        fontSize: 16,
        fontFamily: 'ProximaNova_Bold',
        fontWeight: '600',
    },
    statusTextOrange: {
        marginRight: 15,
        color: 'orange',
        fontSize: 16,
        fontFamily: 'ProximaNova_Bold',
        fontWeight: '600',
    },
    statusTextGreen: {
        marginRight: 15,
        color: 'green',
        fontSize: 16,
        fontFamily: 'ProximaNova_Bold',
        fontWeight: '600',
    },
    inspectButton: {
        flexDirection: 'row',
        backgroundColor: '#36d42d',
        paddingLeft: Platform.OS === 'ios' ? 10 : 15,
        paddingRight: Platform.OS === 'ios' ? 10 : 15,
        paddingTop: Platform.OS === 'ios' ? 2 : 5,
        paddingBottom: Platform.OS === 'ios' ? 2 : 5,
        borderRadius: 48,
        position: 'absolute',
        right: Platform.OS === 'ios' ? 10 : 20,
        bottom: Platform.OS === 'ios' ? 2 : 10,
        
    },
    inspectText: {
        marginLeft: 5,
        color: 'white',
        fontSize: 16,

    },
    screenButton: {
        // flex: 0.1,
        alignSelf: 'center',
        width: '80%',
        marginBottom: Platform.OS === 'ios' ? 80 : 0,
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
})