import * as React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, NavigationContainer} from 'react-native';
import LoadCard from '../Loads/LoadCard';
import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');

export default function MyProposalsScreen({navigation}) {
    return(
        <View style={styles.loadsContainer}>
            <LoadCard/>
        </View>
    )
}

const styles = StyleSheet.create({
    loadsContainer: { 
        height: height,
        alignItems: 'center', 
        backgroundColor: '#eff0f7',
        padding: 20,
        paddingTop: 50,
    }
});