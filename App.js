import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useSelector, useDispatch} from "react-redux";
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import  MainContainer from './Navigation/MainPages/MainContainer'
import  PhoneScreen from './Navigation/Registration/Phone'
import  ConfirmationCodeScreen from './Navigation/Registration/ConfirmationCode'
import UserAuth from './Navigation/Registration/UserAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createStackNavigator();

const initialState = {
  isRegistered: false
};

const reducer = (state = initialState, action) => {
  if (action.type === "UPDATE_IS_REGISTERED") {
    return {isRegistered: true}
  } else if (action.type === "UPDATE_NOT_REGISTERED") {
    return {isRegistered: false}
  }
  return state;
};

const store = createStore(reducer);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['isRegistered'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer)


export const storePersist = createStore(persistedReducer);

let persistor = persistStore(storePersist);


const AppSwitch = () => {

  const register = useSelector(state => state.isRegistered)
  console.log(register)
  if (!register) {
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
              {/* <Stack.Screen
                name="MainContainer"
                component={MainContainer}
                options={{headerShown: false}}
                
              /> */}
            </Stack.Navigator>
          </NavigationContainer>  
      
    )
      } else {
        return(
          
            <MainContainer/>
          
        )
      }
}
function App() {

  const [loaded] = useFonts({
    ProximaNova: require('./assets/fonts/Proxima_Nova_Font.otf'),
    ProximaNova_Regular: require('./assets/fonts/proxima_ssv/ProximaNova-Regular.otf'),
    ProximaNova_Bold: require('./assets/fonts/proxima_ssv/Proxima_Nova_Bold.otf')

  })
  if(!loaded) {return null}
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}>

      </PersistGate> */}
        <SafeAreaProvider>
          <AppSwitch/>
        </SafeAreaProvider>
    </Provider>

  )
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