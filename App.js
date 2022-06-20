import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={[styles.mainContainer]}>
      <Text style={[styles.textStyle]}>Hello</Text>
    </View>
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
