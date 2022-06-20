import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import  MainContainer from './Navigation/MainPages/MainContainer'

const Stack = createStackNavigator();

const NavScreen = () => {
  return (
    <View style={[styles.mainContainer]}>
      <Text style={[styles.textStyle]}>Hello</Text>
    </View>
  )
}

function App() {
  return (
    <MainContainer/>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="MainContainer"
    //       component={MainContainer}
    //       options={{headerShown: false}}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>

    // <View style={[styles.mainContainer]}>
    //   <Text style={[styles.textStyle]}>Hello</Text>
    // </View>
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