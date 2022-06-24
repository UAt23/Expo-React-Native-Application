import * as React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const Inspect = () => {
    const {height} = useWindowDimensions();
    const [code, setCode] = React.useState('');

    const onGiveOfferPressed = () => {
        
    }

    return (
        <View style={[styles.root, {height: height * 0.95}]}>
            <View style={styles.screenContent}>
                <View style={{flex: 0.80, justifyContent: 'space-between'}}>
                    <View>
                        <Text style={styles.headerTwo}>Çıkış Adres:</Text>
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Varış Adres:</Text>
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Yük Tipi:</Text>
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Yük Ağırlığı:</Text>
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Araç Tipi</Text>
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Dorse Tipi</Text>
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>Hacim:</Text>
                    </View>
                    <View>
                        <Text style={styles.headerTwo}>En düşük teklif:</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.offer}>
                        <TextInput  
                            style={styles.phoneInput}
                            keyboardType= 'number-pad'
                        />
                        <Text style={styles.headerThree}>**Bu ilana 2 teklif verilmiştir. En düşük teklif 2000TL.</Text>
                    </View>
                    <View style={styles.offer}>
                        <Pressable onPress={onGiveOfferPressed} style={styles.button}>
                            <Text style={styles.buttonInner}>Teklif Ver</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#eff0f7",
        
    },
    headerOne: {
        color: "#16234e",
        flex: 0.2,
        fontSize: 24,
        textAlign: 'center',
        padding: 4,
        fontWeight: "500",
    },
    headerTwo: {
        color: "#16234e",
        fontSize: 18,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "500",
    },
    headerThree: {
        color: "#16234e",
        fontSize: 12,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "500",
        textAlign: 'center',
    },
    phoneInput: {
        backgroundColor: "white",
        borderRadius: 12,
        height: 50,
        paddingLeft: 20
    },
    screenContent: {
        flex: 0.8,
        justifyContent: 'space-between',
        width: '100%',
        
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
    testimonial: {
        color: 'white',
        marginTop: 10,

    },
    offer: {
        paddingLeft: 40,
        paddingRight: 40,

    }
    
})

export default Inspect;