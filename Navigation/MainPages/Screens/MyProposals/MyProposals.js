import * as React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, NavigationContainer} from 'react-native';
import LoadCard from '../Loads/LoadCard';


export default function MyProposalsScreen({navigation}) {
    return(
        <View style={styles.loadsContainer}>
            <LoadCard/>
        </View>
    )
}

const styles = StyleSheet.create({
    loadsContainer: { 
        alignItems: 'center', 
        backgroundColor: '#eff0f7',
        padding: 20,
        marginTop: 50,
    }
})