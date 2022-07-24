import * as React from 'react';
import { View, Text, Image,  } from 'react-native';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useFocusEffect } from '@react-navigation/native';
import LoadsScreen from './Screens/Loads/Loads'
import MyProposalsScreen from './Screens/MyProposals/MyProposals'
import SettingsScreen from './Screens/Settings/Settings'

//Screen Names
const loadsName = 'Yükler';
const myProposalsName = 'Tekliflerim';
const settingsName = 'Ayarlar';

const Tab = createBottomTabNavigator();

const MainContainer = ({navigation, route}) => {
    return(
        
        <SafeAreaProvider >
            <NavigationContainer independent={true}>
                <Tab.Navigator
                    initialRouteName={loadsName}
                    screenOptions={({route}) => ({
                        headerShown: false,
                        tabBarActiveTintColor: '#83899e',
                        tabBarInactiveTintColor: 'white',
                        tabBarActiveBackgroundColor: '#16234e', 
                        tabBarLabelStyle: {
                            fontFamily: "ProximaNova_Bold",
                            fontSize: 13,
                            
                        },
                        tabBarHideOnKeyboard: true,
                        tabBarStyle: {
                            height: 70,
                        },
                        tabBarIcon: ({ac}) => {
                            let rn = route.name;

                            if (rn === loadsName) {
                                
                            } else if (rn === myProposalsName) {
                                return <Image
                                    source={require('../../assets/navigation/my_proposals.png')}
                                    style={{ height: 25, width: 25,}}
                                />;
                            } else if (rn === settingsName) {
                                return <Image
                                    source={require('../../assets/navigation/settings.png')}
                                    style={{ height: 25, width: 25,}}
                                />;
                            }
                            
                        },
                    })}>
                    
                    <Tab.Screen 
                        name={loadsName} 
                        component={LoadsScreen}
                        options={({route}) => ({
                            tabBarIcon: ({focused}) => {
                                let rn = route.name;
    
                                if (focused) {
                                        return <Image
                                            source={require('../../assets/navigation/loads_active.png')}
                                            style={{ height: 25, width: 25,  }}
                                        />;
                                    } else return <Image
                                    source={require('../../assets/navigation/loads.png')}
                                    style={{ height: 25, width: 25,  }}
                                />;
                                
                            },
                            tabBarStyle: ((route) => {
                                const tabHiddenRoutes = ["NewCarInfo","PersonalInfo", "Documents", "CameraComponent", "Complete", "Inspect", "AddNewCar"];
                                    
                        
                                if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
                                    return { display: 'none' }
                                }
                    
                                return {
                                    "display": "flex",
                                    "backgroundColor": "#16234e",
                                    

                                }
                            })(route)
                        })}
                    />
                    <Tab.Screen 
                        name={myProposalsName} 
                        component={MyProposalsScreen}
                        options={({route}) => ({
                            tabBarIcon: ({focused}) => {
                                let rn = route.name;
    
                                if (focused) {
                                        return <Image
                                            source={require('../../assets/navigation/my_proposals_active.png')}
                                            style={{ height: 25, width: 40,  }}
                                        />;
                                    } else return <Image
                                    source={require('../../assets/navigation/my_proposals.png')}
                                    style={{ height: 25, width: 40,  }}
                                />;
                                
                            },
                            tabBarStyle: ((route) => {
                                    const tabHiddenRoutes = ["NewCarInfo","PersonalInfo", "Documents", "CameraComponent", "Complete", "Inspect", "AddNewCar"];
                                        
                            
                                    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
                                        return { display: 'none' }
                                    }
                        
                                    return {
                                        "display": "flex",
                                        "backgroundColor": "#16234e",
                                        

                                    }
                                })(route)
                        })}
                    />
                    <Tab.Screen 
                        name={settingsName} 
                        component={SettingsScreen} 
                        options={
                            ({route}) => ({
                                tabBarIcon: ({focused}) => {
                                    let rn = route.name;
        
                                    if (focused) {
                                            return <Image
                                                source={require('../../assets/navigation/settings_active.png')}
                                                style={{ height: 25, width: 25,  }}
                                            />;
                                        } else return <Image
                                        source={require('../../assets/navigation/settings.png')}
                                        style={{ height: 25, width: 25,  }}
                                    />; 
                                    
                                },
                                tabBarStyle: ((route) => {
                                    const tabHiddenRoutes = ["NewCarInfo","PersonalInfo", "Documents", "CameraComponent", "Complete", "Inspect", "AddNewCar"];
                                        
                            
                                    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
                                        return { display: 'none' }
                                    }
                        
                                    return {
                                        "display": "flex",
                                        "backgroundColor": "#16234e",
                                        

                                    }
                                    })(route)
                                })
                        }
                    />

                </Tab.Navigator>    
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
export default MainContainer;