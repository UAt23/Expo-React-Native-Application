import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import PersonalInfo from './PersonalInfo';
import Documents from './Documents';
import NewCarInfo from './NewCarInfo';
import CameraComponent from "./Camera"
import LocationPermission from './Location';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const Settings = createStackNavigator();
const {width, height} = Dimensions.get('window');

const SettingsTab = () => {
    
    const navigation = useNavigation();
    
    const route = useRoute();

    // console.log('HEYY ' + route.params?.location)

    const onInfoPressed = () => {
        navigation.navigate('PersonalInfo')
    }
    const onDocumentsPressed = () => {
        navigation.navigate('Documents')
    }
    const onCarInfoPressed = () => {
        navigation.navigate('NewCarInfo')
    }
    
    const onLocationPressed = () => {
        navigation.navigate('Location')
        
    }
    const onHelpPressed = () => {
        
    }
    

    return (
        <View style={[styles.root]}>
            <View style={styles.screenContent}>
                <View style={{flex: 0.50, justifyContent: 'space-between'}}>
                    <Pressable onPress={onInfoPressed}>
                        <Text style={styles.headerTwo}>Kişisel Bilgiler</Text>
                    </Pressable>
                    <Pressable onPress={onDocumentsPressed}>
                        <Text style={styles.headerTwo}>Belgelerim</Text>
                    </Pressable>
                    <Pressable onPress={onCarInfoPressed}>
                        <Text style={styles.headerTwo}>Araç Bilgileri</Text>
                    </Pressable>
                    <Pressable onPress={onLocationPressed}>
                        <Text style={styles.headerTwo}>Bana özel ilan getir.</Text>
                    </Pressable>
                    <Pressable onPress={onHelpPressed}>
                        <Text style={styles.headerTwo}>Yardım</Text>
                    </Pressable>
                    
                </View>
            </View>
        </View>
    )
}

const AddNewCar = () => {

    const navigation = useNavigation();

    const openCamera = () => {
        navigation.navigate('CameraComponent')
    }

    return (
        (
            <DismissKeyboard>
                <ScrollView>
                    <View style={styles.carInfoRoot}>
                        <View style={styles.screenContent}>
                            <View>
                                <Text style={styles.headerTwo}>Araç Plakası</Text>
                                <TextInput 
                                    style={styles.Input}
                                    keyboardType= 'number-pad'
                                    />
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Araç Markası</Text>
                                <TextInput 
                                    style={styles.Input}
                                    keyboardType= 'number-pad'
                                    />
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Model Yılı</Text>
                                <TextInput 
                                    style={styles.Input}
                                    keyboardType= 'number-pad'
                                    />
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Azami Yüklü Ağırlık(Ton)</Text>
                                <TextInput 
                                    style={styles.Input}
                                    keyboardType= 'number-pad'
                                    />
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Araç Tipi</Text>
                                <TextInput 
                                    style={styles.Input}
                                    keyboardType= 'number-pad'
                                    />
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Dorse Tipi</Text>
                                <TextInput 
                                    style={styles.Input}
                                    keyboardType= 'number-pad'
                                    />
                            </View>
                            <View>
                                <Text style={styles.headerTwo}>Ruhsat</Text>
                                <View style={styles.buttonRows}>
                                    <Pressable  style={styles.buttonSecond}>
                                        <Text style={styles.buttonInnerSecond} onPress={openCamera}>+Sayfa 1 Yükle</Text>
                                    </Pressable>
                                    <Pressable  style={styles.buttonSecond}>
                                        <Text style={styles.buttonInnerSecond} onPress={openCamera}>+Sayfa 2 Yükle</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <View style={{marginVertical: 10,}}>
                                <View style={styles.buttonRows}>
                                    <Text style={styles.headerTwo}>Sigorta Poliçesi</Text>
                                    <Pressable  style={styles.buttonSecond}>
                                        <Text style={styles.buttonInnerSecond}>+ Yükle</Text>
                                    </Pressable>
                                </View>
                                <View style={styles.buttonRows}>
                                    <Text style={styles.headerTwo}>Muayene</Text>
                                    <Pressable  style={styles.buttonSecond}>
                                        <Text style={styles.buttonInnerSecond}>+ Yükle</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={styles.screenButton}>
                            <Pressable  style={styles.button}>
                                <Text style={styles.buttonInner}>TAMAM</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>    
            </DismissKeyboard>
        )
    )
}

export default function SettingsScreen({navigation}) {

    
    return(
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
                    }}
                />
                <Settings.Screen
                    name="Documents"
                    component={Documents}
                    options={{headerShown: true, 
                        headerStyle: {backgroundColor: '#16234e'}, 
                        headerTitleStyle: {color: 'white'},
                        headerTintColor: 'white',
                    }}
                />
                <Settings.Screen
                    name="NewCarInfo"
                    component={NewCarInfo}
                    options={{headerShown: true, 
                        headerStyle: {backgroundColor: '#16234e'}, 
                        headerTitleStyle: {color: 'white'},
                        headerTintColor: 'white',
                    }}
                />
                <Settings.Screen
                    name="AddNewCar"
                    component={AddNewCar}
                    options={{headerShown: true, 
                        headerStyle: {backgroundColor: '#16234e'}, 
                        headerTitleStyle: {color: 'white'},
                        headerTintColor: 'white',
                    }}
                />
                <Settings.Screen
                    name="CameraComponent"
                    component={CameraComponent}
                    options={{headerShown: false}}
                />
                <Settings.Screen
                    name="Location"
                    component={LocationPermission}
                    options={{headerShown: false}}
                />
        </Settings.Navigator>
    )
}

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
        paddingTop: 50,
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