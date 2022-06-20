import * as React from 'react';
import { View, Text } from 'react-native';

export default function LoadsScreen({navigation}) {
    return(
        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
            onPress={() => alert('This is LOADS')}
            style={{fontSize:26, fontWeight: 'bold'}}>LOADS Screen</Text>
        </View>
    )
}