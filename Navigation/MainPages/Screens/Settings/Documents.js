import * as React from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';


const {width, height} = Dimensions.get('window');

const Documents = () => {
    const navigation = useNavigation();
    const openCamera = () => {
        navigation.navigate('CameraComponent')
    }

    return (
        <View style={styles.root}>
            <View>
                <View style={{marginBottom: 20}}>
                    <Text style={styles.sectionHeader}>Kişisel Belgeler</Text>
                    <View style={styles.container}>
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Ehliyet Ön Yüz</Text>
                            <Text style={styles.statusText} >Yüklenmedi</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Ehliyet Arka Yüz</Text>
                            <Text style={styles.statusText} >Yüklenmedi</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Psikoteknik</Text>
                            <Text style={styles.statusText} >Yüklenmedi</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >SRC</Text>
                            <Text style={styles.statusText} >Yüklenmedi</Text>
                        </Pressable>
                    </View>
                </View>    
                <View>
                    <Text style={styles.sectionHeader}>Firma Belgeleri</Text>
                    <View style={styles.container}>
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Fatura Örneği</Text>
                            <Text style={styles.statusText} >Yüklenmedi</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Yetki Belgesi</Text>
                            <Text style={styles.statusText} >Yüklenmedi</Text>
                        </Pressable>
                        <View
                            style={{
                                borderBottomColor: '#ebebec',
                                borderBottomWidth: 1,
                            }}
                        />
                        <Pressable onPress={openCamera} style={styles.innerLines}>
                            <Text style={styles.text} >Vergi Levhası</Text>
                            <Text style={styles.statusText} >Yüklenmedi</Text>
                        </Pressable>
                    </View>
                </View>  
            </View>
        </View>
    )
}

export default Documents

const styles = StyleSheet.create ({
    root: {
        flexDirection: "column",
        height: height,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#eff0f7",
        paddingTop: 20,
    },
    container: {
        width: width * 0.9,
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingLeft: 10,
        paddingRight: 0,
        paddingTop: 5,
        paddingBottom: 5,
        marginVertical: 5,
        
    },
    innerLines: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: 10,


    },
    
    text: {
        marginLeft: 10,
        color: '#16234e',
        fontSize: 16,
        fontWeight: '600',
    },
    sectionHeader: {
        marginLeft: 20,
        color: '#737378',
        fontSize: 16,
        fontWeight: '600',
    },
    statusText: {
        marginRight: 15,
        color: '#737378',
        fontSize: 16,
        fontWeight: '600',
    },
    inspectButton: {
        flexDirection: 'row',
        backgroundColor: '#36d42d',
        paddingLeft: Platform.OS === 'ios' ? 10 : 15,
        paddingRight: Platform.OS === 'ios' ? 10 : 15,
        paddingTop: Platform.OS === 'ios' ? 2 : 5,
        paddingBottom: Platform.OS === 'ios' ? 2 : 5,
        borderRadius: 48,
        position: 'absolute',
        right: Platform.OS === 'ios' ? 10 : 20,
        bottom: Platform.OS === 'ios' ? 2 : 10,
        
    },
    inspectText: {
        marginLeft: 5,
        color: 'white',
        fontSize: 16,

    }
})