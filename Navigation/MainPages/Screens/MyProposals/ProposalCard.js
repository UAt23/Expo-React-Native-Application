import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import dateLogo from '../../../../assets/loads/dateLogo.png';
import locationLogo from '../../../../assets/loads/locationLogo.png';
import weightLogo from '../../../../assets/loads/weightLogo.png';
import minLogo from '../../../../assets/loads/minLogo.png';
import inspectLogo from '../../../../assets/loads/inspectLogo.png';
import ContentLoader from "react-native-easy-content-loader";
import Inspect from '../Loads/Inspect';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userOffers } from "../../../AsyncStorage";
import ActivityIndicatorExample from '../../../ActivityIndicator';



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



const {width, height} = Dimensions.get('window');

const ProposalCard = ({data}) => {
    
    const [isLoading, setLoading] = useState(false);
    const [advert, setAdvert] = useState([]);
    
    

    // console.log("@@@@@@@@@@@@@@@@@"+data)
    const navigation = useNavigation();
    const onInspectPressed = () => {
        navigation.navigate('Inspect', {id: data[0], given: true})
    }
    return (
        <Pressable style={({pressed}) => [{
            backgroundColor: pressed 
            ? '#81E47C'
            : 'white'
        },
            styles.container]} onPress={onInspectPressed}>
            <View style={styles.innerLines}>
                <Image 
                    source={dateLogo} 
                    style={styles.logos} 
                    resizeMode="contain" 
                />
                <Text style={styles.text} >{LoadData.date}, {data[0]} - {data[1]}</Text>
            </View>
            <View style={styles.innerLines}>
                <Image 
                    source={locationLogo} 
                    style={styles.logos} 
                    resizeMode="contain" 
                    />
                <Text style={styles.text} >{data[2]} çıkış / {data[3]} varış</Text>
            </View>
            <View style={styles.innerLines}>
                <Image 
                    source={weightLogo} 
                    style={styles.logos} 
                    resizeMode="contain" 
                    />
                <Text style={styles.text} >{data[5]}</Text>
            </View>
            <View style={styles.innerLines}>
                <Image 
                    source={minLogo} 
                    style={styles.logos} 
                    resizeMode="contain" 
                    />
                <Text style={styles.text} >Min. Teklif: {data[9]} tl</Text>
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
        </Pressable>
    )
}


const styles = StyleSheet.create ({
    container: {
        width: width * 0.9,
        borderRadius: 24,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        marginVertical: 15,
        
    },
    loadsContainer: {
        height: height * 0.1,
        alignItems: 'flex-start', 
        backgroundColor: '#eff0f7',
        marginVertical: 15
    },
    innerLines: {
        flexDirection: 'row',
        flex: 0,
        marginVertical: 1,
        alignItems: 'center'
        

    },
    logos: {
        height: 25,
        width: 20,

    },
    text: {
        marginLeft: 10,
        color: '#16234e',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'ProximaNova_Bold'

    },
    textLoader: {
        marginLeft: 10,
        color: '#16234e',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'ProximaNova_Bold'

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
        alignItems:'center',

        
    },
    inspectText: {
        marginLeft: 5,
        color: 'white',
        fontSize: 16,
        fontFamily: 'ProximaNova_Bold'
    },
    loader: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: width * 0.07
    }
})

export default ProposalCard;