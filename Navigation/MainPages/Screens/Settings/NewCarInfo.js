import * as React from 'react';
import { Dimensions } from 'react-native';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, TextInput, SafeAreaView, ScrollView,} from 'react-native';

const {width, height} = Dimensions.get('window');

const Documents = () => {

    return (
        <ScrollView>
            <View style={styles.root}>
                <View style={styles.screenContent}>
                    <View>
                        <Text style={styles.headerTwo}>Araç Plakası</Text>
                        <TextInput 
                            style={styles.Input}
                            keyboardType= 'number-pad'
                            />
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Araç Markası</Text>
                        <TextInput 
                            style={styles.Input}
                            keyboardType= 'number-pad'
                            />
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Model Yılı</Text>
                        <TextInput 
                            style={styles.Input}
                            keyboardType= 'number-pad'
                            />
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Azami Yüklü Ağırlık(Ton)</Text>
                        <TextInput 
                            style={styles.Input}
                            keyboardType= 'number-pad'
                            />
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Araç Tipi</Text>
                        <TextInput 
                            style={styles.Input}
                            keyboardType= 'number-pad'
                            />
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Dorse Tipi</Text>
                        <TextInput 
                            style={styles.Input}
                            keyboardType= 'number-pad'
                            />
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Ruhsat</Text>
                        <View style={styles.buttonRows}>
                            <Pressable  style={styles.buttonSecond}>
                                <Text style={styles.buttonInnerSecond}>+Sayfa 1 Yükle</Text>
                            </Pressable>
                            <Pressable  style={styles.buttonSecond}>
                                <Text style={styles.buttonInnerSecond}>+Sayfa 2 Yükle</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{marginVertical: 10,}}>
                        <View style={styles.buttonRows}>
                            <Text style={styles.headerTwo}>Sigorta Poliçesi</Text>
                            <Pressable  style={styles.buttonSecond}>
                                <Text style={styles.buttonInnerSecond}>+ Yükle</Text>
                            </Pressable>
                        </View>
                        <View style={styles.buttonRows}>
                            <Text style={styles.headerTwo}>Muayene</Text>
                            <Pressable  style={styles.buttonSecond}>
                                <Text style={styles.buttonInnerSecond}>+ Yükle</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.screenButton}>
                    <Pressable  style={styles.button}>
                        <Text style={styles.buttonInner}>TAMAM</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>    
    )
}

export default Documents

const styles = StyleSheet.create ({
    root: {
        flexDirection: "column",
        height: height * 1.05,
        width: width,
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
    screenContent: {
        flex: 0.8,
        justifyContent: 'space-between',
        width: '80%',
        
    },
    headerTwo: {
        color: "#16234e",
        fontSize: 16,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "500",
    },
    text: {
        marginLeft: 10,
        color: '#16234e',
        fontSize: 16,
        fontWeight: '600',
    },
    Input: {
        backgroundColor: "white",
        borderRadius: 12,
        height: height * 0.06,
        paddingLeft: 20
    },
    screenButton: {
        flex: 0.1,
        justifyContent: 'flex-end',
        width: '80%',
        marginBottom: 10,
        
    },
    button: {
        backgroundColor: '#36d42d',
        alignItems: 'center',
        width: "100%",
        padding: 10,
        borderRadius: 12,
        
    },
    buttonInner: {
        color: 'white',
        fontWeight: '600',
        fontSize: 24,
    },
    buttonSecond: {
        backgroundColor: 'white',
        alignItems: 'center',
        width: "45%",
        padding: 10,
        borderRadius: 12,
    },
    buttonInnerSecond: {
        color: '#737378',
        fontWeight: '600',
        fontSize: 12,
    },
    buttonRows: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    }
})