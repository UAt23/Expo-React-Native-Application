import * as React from 'react';
import { View, Text } from 'react-native';

export default function SettingsScreen({navigation}) {
    return(
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
            onPress={() => alert('This is SETTINGS')}
            style={{fontSize:26, fontWeight: 'bold'}}>SETTINGS Screen</Text>
        </View>
    )
}