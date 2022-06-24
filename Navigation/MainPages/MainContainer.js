import * as React from 'react';
import { View, Text, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoadsScreen from './Screens/Loads/Loads'
import MyProposalsScreen from './Screens/MyProposals/MyProposals'
import SettingsScreen from './Screens/Settings/Settings'

//Screen Names
const loadsName = 'Loads';
const myProposalsName = 'MyProposals';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return(
        <NavigationContainer independent={true}>
            <Tab.Navigator
                initialRouteName={loadsName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({tintColor}) => {
                        let rn = route.name;

                        if (rn === loadsName) {
                            return <Image
                                source={require('../../assets/navigation/loads.png')}
                                style={{ height: 25, width: 25, tintColor: tintColor }}
                            />;
                        } else if (rn === myProposalsName) {
                            return <Image
                                source={require('../../assets/navigation/my_proposals.png')}
                                style={{ height: 25, width: 25, tintColor: tintColor }}
                            />;
                        } else if (rn === settingsName) {
                            return <Image
                                source={require('../../assets/navigation/settings.png')}
                                style={{ height: 25, width: 25, tintColor: tintColor }}
                            />;
                        }
                        
                    },
                    "headerShown": false,
                    "tabBarActiveTintColor": "",
                    "tabBarInactiveTintColor": "gray",
                    "tabBarLabelStyle": {
                        "paddingBottom": 10,
                        "fontSize": 10,
                        "color": "white",
                        
                    },
                    "tabBarStyle": [
                        {
                            "display": "flex",
                            "backgroundColor": "#16234e",
                            "padding": 10,
                            "height": 70,
                        },
                        null
                    ]
                })}>
                
                <Tab.Screen name={loadsName} component={LoadsScreen}/>
                <Tab.Screen name={myProposalsName} component={MyProposalsScreen}/>
                <Tab.Screen name={settingsName} component={SettingsScreen}/>

            </Tab.Navigator>    
        </NavigationContainer>
    )
}