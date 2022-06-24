import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import  MainContainer from './Navigation/MainPages/MainContainer'
import  PhoneScreen from './Navigation/Registration/Phone'
import  ConfirmationCodeScreen from './Navigation/Registration/ConfirmationCode'
import UserAuth from './Navigation/Registration/UserAuth';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PhoneScreen"
          component={PhoneScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConfirmationCode"
          component={ConfirmationCodeScreen}
          options={{headerShown: true, 
            headerStyle: {backgroundColor: '#1F316E'}, 
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="UserAuth"
          component={UserAuth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainContainer"
          component={MainContainer}
          options={{headerShown: false}}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#16234e',
    width: '100%',
    height: '100%',
  },
  textStyle: {
    color: 'white',
    fontSize: 32.0,
  },
});

export default  App;