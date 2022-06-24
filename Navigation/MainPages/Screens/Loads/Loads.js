import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, NavigationContainer} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import LoadCard from './LoadCard';
import Inspect from './Inspect';

const Load = createStackNavigator();

const LoadCards = () => {
    return (
        <View style={styles.loadsContainer}>
            <LoadCard/>
            <LoadCard/>
        </View>
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
        alignItems: 'center', 
        backgroundColor: '#eff0f7',
        padding: 20,
        marginTop: 50,
    }
})

export default LoadsScreen;