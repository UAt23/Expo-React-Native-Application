import { StyleSheet, Text, View } from 'react-native'
import { StackActions } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import  React, {useEffect, useState}  from 'react'
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const popAction = StackActions.pop(1);
const {width, height} = Dimensions.get('window');

const LocationPermission = () => {

    const navigation = useNavigation();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [getLocation, setGetLocation] = useState(false);

    useEffect(() => {
        (async () => {
            let { statusLocation } = await Location.requestForegroundPermissionsAsync();
            if (statusLocation !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
            
            // let token;

            // let { status: existingStatus } = await Notifications.getPermissionsAsync();
            // let finalStatus = existingStatus;

            // if (existingStatus !== 'granted') {
            //     const { status } = await Notifications.requestPermissionsAsync();
            //     finalStatus = status;
            // }
            // if (finalStatus !== 'granted') {
            //     alert('Failed to get push token for push notification!');
            //     return;
            // }
            // token = (await Notifications.getExpoPushTokenAsync()).data;

        })();
    }, []);
    navigation.navigate('SettingsTab')
    

    return (
        
        <View style={styles.container}>
            { getLocation ? <Text style={styles.text}>İzin verildi.</Text> : <Text style={styles.text}>Konum izni alınıyor...</Text>}
        </View>
    )
}

export default LocationPermission;

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#16234e",
        fontWeight: "700",
        fontSize: 24,
    },
})