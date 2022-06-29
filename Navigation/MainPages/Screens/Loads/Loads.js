import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, NavigationContainer, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import LoadCard from './LoadCard';
import Inspect from './Inspect';

import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

const Load = createStackNavigator();

const LoadCards = () => {

    const [filter, setFilter] = useState("Seçilmedi");
    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            const locationGot = await Location.getCurrentPositionAsync({accuracy: 6});
            const address = await Location.reverseGeocodeAsync(locationGot.coords);
            setLocation(address[0]["region"]);
        })();
    }, []);
    console.log(filter)

    const navigation = useNavigation();

    const route = useRoute();

    return (
        <ScrollView>
            <View style={styles.loadsContainer}>
                <RNPickerSelect
                    style={styles.picker}
                    useNativeAndroidPickerStyle={true}
                    
                    onValueChange={(value) => {
                        setFilter(value);
                    }}
                    items={[
                        { label: 'Konumumu Kullan', value: location === null ? 'Konum' : location },
                        { label: 'Ankara', value: 'Ankara' },
                        { label: 'Çanakkale', value: 'Çanakkale' },
                    ]}
                >
                    { filter === null 
                    ? <Text style={styles.text} >Çıkış bölgesine göre sırala: Seçiniz</Text>
                    : <Text style={styles.text} >Çıkış bölgesine göre sırala: {filter}</Text>
                    }
                </RNPickerSelect>
                <LoadCard/>
                <LoadCard/>
                <LoadCard/>
                <LoadCard/>
                </View>
        </ScrollView>
    )
}

const LoadsScreen = ({navigation}) => {
    return(
        
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
                        headerStyle: {backgroundColor: '#16234e'}, 
                        headerTitleStyle: {color: 'white'},
                        headerTintColor: 'white',
                    }}
                />
            </Load.Navigator>
        
        
    )
}

const styles = StyleSheet.create({
    loadsContainer: {
        height: height,
        alignItems: 'center', 
        backgroundColor: '#eff0f7',
        padding: 20,
        paddingTop: 50,
    },
    filter: {
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#16234e'
    },
    picker: {
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