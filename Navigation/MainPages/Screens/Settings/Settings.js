import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';
import PersonalInfo from './PersonalInfo';
import Documents from './Documents';
import NewCarInfo from './NewCarInfo';


const Settings = createStackNavigator();
const {width, height} = Dimensions.get('window');

const SettingsTab = () => {

    const navigation = useNavigation();


    const onInfoPressed = () => {
        navigation.navigate('PersonalInfo')
    }
    const onDocumentsPressed = () => {
        navigation.navigate('Documents')
    }
    const onCarInfoPressed = () => {
        navigation.navigate('NewCarInfo')
    }
    const onNotificationPressed = () => {
        
    }
    const onLocationPressed = () => {
        
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
                    <Pressable onPress={onNotificationPressed}>
                        <Text style={styles.headerTwo}>Yeni yük talebi bilgilendirme</Text>
                    </Pressable>
                    <Pressable onPress={onLocationPressed}>
                        <Text style={styles.headerTwo}>Lokasyonuma özel yük talepleri</Text>
                    </Pressable>
                    <Pressable onPress={onHelpPressed}>
                        <Text style={styles.headerTwo}>Yardım</Text>
                    </Pressable>
                    
                </View>
            </View>
        </View>
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
        </Settings.Navigator>
    )
}

const styles = StyleSheet.create({
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