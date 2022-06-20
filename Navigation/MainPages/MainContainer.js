import * as React from 'react';
import { View, Text, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LoadsScreen from './Screens/Loads'
import MyProposalsScreen from './Screens/MyProposals'
import SettingsScreen from './Screens/Settings'

//Screen Names
const loadsName = 'Loads';
const myProposalsName = 'MyProposals';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return(
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={loadsName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, tintColor}) => {
                        let iconName;
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
                        // if (rn === loadsName) {
                        //     iconName = focused ? 'home' : 'home-outline'
                        // } else if (rn === myProposalsName) {
                        //     iconName = focused ? 'list' : 'list-outline'
                        // } else if (rn === settingsName) {
                        //     iconName = focused ? 'settings' : 'settings-outline'
                        // }
                        
                    },
                })}
                tabBarOptions= {{
                    activeTintColor: 'tomato', //For changing tint colors
                    inactiveTintColor: 'gray',
                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70}
                }}
                
                >
                
                <Tab.Screen name={loadsName} component={LoadsScreen}/>
                <Tab.Screen name={myProposalsName} component={MyProposalsScreen}/>
                <Tab.Screen name={settingsName} component={SettingsScreen}/>

            </Tab.Navigator>

                
                
        </NavigationContainer>
    )
}