import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, Switch} from 'react-native';
import * as Location from 'expo-location';
import PersonalInfo from './PersonalInfo';
import Documents from './Documents';
import NewCarInfo from './NewCarInfo';
import CameraComponent from "./Camera"
import AddNewCar from "./AddNewCar"
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Linking } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { savePermission } from "../../../AsyncStorage"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const Settings = createStackNavigator();
const {width, height} = Dimensions.get('window');

const SettingsTab = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [filter, setFilter] = useState("Seçilmedi");
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const printer = async () => {
                let auth = await AsyncStorage.getItem("permission").then(userToken => {
                    const state = userToken;
                setIsEnabled(JSON.parse(state));
                return state;
            })
            
            
            }
            printer()
        });
        return unsubscribe
    }, [navigation, location]);
    
    const navigation = useNavigation();
    
    const route = useRoute();
    
    console.log(isEnabled)

    const onInfoPressed = () => {
        navigation.navigate('PersonalInfo')
    }
    const onDocumentsPressed = () => {
        navigation.navigate('Documents')
    }
    const onCarInfoPressed = () => {
        navigation.navigate('NewCarInfo')
    }
    
    const onLocationPressed = async () => {
        let { statusLocation } = await Location.requestForegroundPermissionsAsync();
        if (statusLocation !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }
        setIsEnabled(!isEnabled)
        savePermission(JSON.stringify(!isEnabled))
        
        // Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
        //     if (statusObj.status !== "granted") {
        //     return Permissions.askAsync(Permissions.NOTIFICATIONS)
        //     }
        //     return statusObj;
        //     }).then((statusObj) => {
        //     if (statusObj.status !== "granted") {
        //     return;
        //     }
        //     })

        await Notifications.scheduleNotificationAsync({
            content: {
            title: "You’ve got mail! 📬",
            body: "Here is the notification body",
            data: { data: "goes here" },
            },
            trigger: null,
        });
    

        // let token;
        // if (Device.isDevice) {
        //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
        //     let finalStatus = existingStatus;
        //     if (existingStatus !== 'granted') {
        //         const { status } = await Notifications.requestPermissionsAsync();
        //         finalStatus = status;
        //     }
        //     if (finalStatus !== 'granted') {
        //         alert('Failed to get push token for push notification!');
        //         return;
        //     }
        //     token = (await Notifications.getExpoPushTokenAsync()).data;
        //     console.log(token);
        // } else {
        //     alert('Must use physical device for Push Notifications');
        // }

        // if (Platform.OS === 'android') {
        //     Notifications.setNotificationChannelAsync('default', {
        //         name: 'default',
        //         importance: Notifications.AndroidImportance.MAX,
        //         vibrationPattern: [0, 250, 250, 250],
        //         lightColor: '#FF231F7C',
        //     });
        // }
            

    }
    const onHelpPressed = () => {
        Linking.openURL('mailto:kamyongoiletisim@gmail.com?subject=Yardım&body=Sorun/Dileğinizi bizimle buradan paylaşabilirsiniz.') 
    }
    

    return (
        <View style={[styles.root]}>
            <View style={styles.screenContent}>
                <View style={{flex: 0.55, justifyContent: 'space-evenly'}}>
                    <Pressable children={({pressed}) => (
                            <Text style={[{color: pressed ? "#BDBEC7" : "#16234e"},styles.headerTwo]}>Kişisel Bilgiler</Text>
                        )} onPress={onInfoPressed}>
                    </Pressable>
                    <Pressable children={({pressed}) => (
                            <Text style={[{color: pressed ? "#BDBEC7" : "#16234e"},styles.headerTwo]}>Belgelerim</Text>
                        )} onPress={onDocumentsPressed}>
                    </Pressable>
                    <Pressable children={({pressed}) => (
                            <Text style={[{color: pressed ? "#BDBEC7" : "#16234e"},styles.headerTwo]}>Araç Bilgileri</Text>
                        )} onPress={onCarInfoPressed}>
                    </Pressable>
                    <Pressable children={({pressed}) => (
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={[{color: pressed ? "#BDBEC7" : "#16234e"},styles.headerTwo]}>Bana özel ilan getir.</Text>
                                <Switch
                                    style={{marginRight: 25}}
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled ? "#16234e" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={onLocationPressed}
                                    value={isEnabled}
                                />
                            </View>
                            
                        )} onPress={onLocationPressed}>
                    </Pressable>
                    <Pressable children={({pressed}) => (
                            <Text style={[{color: pressed ? "#BDBEC7" : "#16234e"},styles.headerTwo]}>Yardım</Text>
                        )} onPress={onHelpPressed}>
                    </Pressable>
                    
                </View>
            </View>
        </View>
    )
}


export default function SettingsScreen({navigation}) {

    
    return(
        <SafeAreaProvider>

            <Settings.Navigator>
                    <Settings.Screen
                        name="SettingsTab"
                        component={SettingsTab}
                        options={{headerShown: false}}
                    />
                    <Settings.Screen
                        name="PersonalInfo"
                        component={PersonalInfo}
                        options={{headerShown: true, 
                            headerStyle: {backgroundColor: '#16234e'}, 
                            headerTitleStyle: {color: 'white'},
                            headerTintColor: 'white',
                            title: 'Kişisel Bilgiler ',
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
                    <Settings.Screen
                        name="Documents"
                        component={Documents}
                        options={{headerShown: true, 
                            headerStyle: {backgroundColor: '#16234e'}, 
                            headerTitleStyle: {color: 'white'},
                            headerTintColor: 'white',
                            title: 'Belgelerim',
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
                    <Settings.Screen
                        name="NewCarInfo"
                        component={NewCarInfo}
                        options={{headerShown: true, 
                            headerStyle: {backgroundColor: '#16234e'}, 
                            headerTitleStyle: {color: 'white'},
                            headerTintColor: 'white',
                            title: 'Araç Bilgileri ',
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
                    <Settings.Screen
                        name="AddNewCar"
                        component={AddNewCar}
                        options={{headerShown: true, 
                            headerStyle: {backgroundColor: '#16234e'}, 
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
                    <Settings.Screen
                        name="CameraComponent"
                        component={CameraComponent}
                        options={{headerShown: false}}
                    />
            </Settings.Navigator>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    carInfoRoot: {
        flexDirection: "column",
        height: height * 1.05,
        width: width,
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#eff0f7",
        paddingTop: 10,
    },
    root: {
        height: height,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#eff0f7",
        paddingTop: 50,
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
        justifyContent: 'space-between',
        width: '95%',
        
    },
    screenButton: {
        flex: 0.1,
        justifyContent: 'flex-end',
        width: '80%',
        marginBottom: 10,
        
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
        fontFamily: 'ProximaNova_Bold'

        

    },
    testimonial: {
        color: 'white',
        marginTop: 10,

    },
    offer: {
        paddingLeft: 40,
        paddingRight: 40,

    },
    Input: {
        backgroundColor: "white",
        borderRadius: 12,
        height: height * 0.06,
        paddingLeft: 20
    },
    buttonSecond: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: "45%",
        padding: 10,
        borderRadius: 12,
    },
    buttonInnerSecond: {
        color: '#737378',
        fontWeight: '600',
        fontSize: 12,
    },
    buttonRows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    }

    
})