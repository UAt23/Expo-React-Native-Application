import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import dateLogo from '../../../../assets/loads/dateLogo.png';
import locationLogo from '../../../../assets/loads/locationLogo.png';
import weightLogo from '../../../../assets/loads/weightLogo.png';
import minLogo from '../../../../assets/loads/minLogo.png';
import inspectLogo from '../../../../assets/loads/inspectLogo.png';
import Inspect from './Inspect';

const LoadData = {
    date: '14 Haziran',
    startTime: '10.00',
    endTime: '10.00',
    exitPoint: 'Mersin',
    dst: 'Samsun',
    weight: '30',
    unit: 'ton',
    minOffer: '2000'
}



const LoadCard = () => {

    const navigation = useNavigation();
    const onInspectPressed = () => {
        navigation.navigate('Inspect')
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerLines}>
                <Image 
                    source={dateLogo} 
                    style={styles.logos} 
                    resizeMode="contain" 
                />
                <Text style={styles.text} >{LoadData.date}, {LoadData.startTime} - {LoadData.endTime}</Text>
            </View>
            <View style={styles.innerLines}>
                <Image 
                    source={locationLogo} 
                    style={styles.logos} 
                    resizeMode="contain" 
                    />
                <Text style={styles.text} >{LoadData.exitPoint} çıkış / {LoadData.dst} varış</Text>
            </View>
            <View style={styles.innerLines}>
                <Image 
                    source={weightLogo} 
                    style={styles.logos} 
                    resizeMode="contain" 
                    />
                <Text style={styles.text} >{LoadData.weight} {LoadData.unit}</Text>
            </View>
            <View style={styles.innerLines}>
                <Image 
                    source={minLogo} 
                    style={styles.logos} 
                    resizeMode="contain" 
                    />
                <Text style={styles.text} >Min. Teklif: {LoadData.minOffer} tl</Text>
            </View>
            <View style={styles.inspectButton}>
                <Image 
                    source={inspectLogo} 
                    style={styles.logos} 
                    resizeMode="contain" 
                />
                <Pressable onPress={onInspectPressed} style={styles.button}>
                    <Text style={styles.inspectText}>İncele</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        width: 380  ,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 20,
        marginVertical: 10,
        
    },
    innerLines: {
        flexDirection: 'row',
        flex: 0,
        marginVertical: 3,


    },
    logos: {
        height: 22,
        width:20,

    },
    text: {
        marginLeft: 10,
        color: '#16234e',
        fontSize: 16,
        fontWeight: '600',

    },
    inspectButton: {
        flexDirection: 'row',
        backgroundColor: '#36d42d',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 48,
        position: 'absolute',
        right: 20,
        bottom: 20,
        
    },
    inspectText: {
        marginLeft: 5,
        color: 'white',
        fontSize: 16,

    }
})

export default LoadCard;