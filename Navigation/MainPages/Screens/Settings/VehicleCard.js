import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, TextInput, } from 'react-native';

const {width, height} = Dimensions.get('window');


const VehicleCard = ({data}) => {
    const navigation = useNavigation();

    const newCarInfo = () => {
        navigation.navigate('AddNewCar', {vehicleId: data[0]})
    }
    
    return (
        <Pressable style={({pressed}) => [{
            backgroundColor: pressed 
            ? '#81E47C'
            : 'white'
        },
        styles.carInfoContainer]} onPress={newCarInfo}>
            <View style={styles.innerLines}>
                <Text style={styles.text}>{data[1]}</Text>
                <Text style={styles.text}>{data[5]}</Text>
            </View>
        </Pressable>
    )
}



const styles = StyleSheet.create ({
    
    root: {
        flexDirection: "column",
        height: height * 0.88,
        width: width,
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
    carInfoContainer: {
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingLeft: 10,
        paddingRight:20,
        paddingTop: 5,
        paddingBottom: 5,
        marginVertical: 10,
        
    },
    innerLines: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: 10,
    },
    screenContent: {
        flex: 0.8,
        width: '85%',
        
    },
    headerTwo: {
        color: "#16234e",
        fontSize: 16,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "500",
        fontFamily: 'ProximaNova_Bold'

    },
    text: {
        marginLeft: 10,
        color: '#16234e',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'ProximaNova_Bold'

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
})

export default VehicleCard;