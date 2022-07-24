import React, {useState} from 'react';
import { connect } from 'react-redux';
import { View, Text, Modal, Image, StyleSheet, useWindowDimensions, Pressable, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import Logo from '../../assets/registeration/kamyongo_logo.png';
import { saveToken } from "../AsyncStorage";
import { useSelector, useDispatch} from "react-redux";
import { Dimensions } from 'react-native';




export const UPDATE_IS_REGISTERED = 'UPDATE_IS_REGISTERED';

export const userRegistered = () => ({
    type: UPDATE_IS_REGISTERED

})
export const notRegistered = () => ({
    type: UPDATE_NOT_REGISTERED

})


const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const {width, height} = Dimensions.get('window');

const UserAuth = () => {

    const route = useRoute();

    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [tc, setTc] = useState(null);

    const register = useSelector(state => state.isRegistered)
    const dispatch = useDispatch()
    console.log(register)


//////////DATE PICKER/////////////////
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');
    const [modalVisible, setModalVisible] = useState(false);

    const onChange = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear();
        // let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText(fDate)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
/////////////////////////////////////

    
    const onButtonPressed = () => {
        // fetch("http://44.206.43.168/api/register", {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         tckn: tc,
        //         isim: name,
        //         soyisim: surname,
        //         dogum_yili: text,
        //         telefon: route.params.number_verified,
        //     }),
        //     headers: {
        //         'Content-type': 'application/json; charset=utf-8',
        //     }
        // }).then(function(response){ 
        //     return response.json()})
        //     .then(function(data) {
        //         console.log(data)
        //         if (data.status === "Success") {
        //             // navigation.navigate('UserAuth', {number_verified: route.params.number})
        //             saveToken(data.auth_token)
        //             dispatch(userRegistered())
        //         }
        //     }).catch(error => console.error('Error:', error)); 
        saveToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0ZWxfbnVtYmVyIjoiKzkwNTQzODY5MTg5NSIsInVzZXJfaWQiOjV9.tL1zkgtl5NdScmd4PHTsxAS6EfNr41UJW8MdoeiVPbc")
        dispatch(userRegistered())
        
        

        // navigation.navigate('MainContainer')
    }
    
    const navigation = useNavigation();

    return (
        <DismissKeyboard>
            <View style={[styles.root, {height: height}]}>
                <Image 
                    source={Logo} 
                    style={[styles.logo, {height: height * 0.15},]} 
                    resizeMode="contain" 
                />
                <View style={styles.screenContent}>
                    <View style={styles.inputFields}>
                        <View>
                            <Text style={styles.headerTwo}>İsim </Text>
                            <TextInput 
                                style={styles.phoneInput}
                                defaultValue={name}
                                onChangeText={newName => setName(newName)}    
                            />
                        </View>
                        <View>
                            <Text style={styles.headerTwo}>Soyisim </Text>
                            <TextInput 
                                style={styles.phoneInput}
                                defaultValue={surname}
                                onChangeText={newSurname => setSurname(newSurname)}
                            />
                        </View>
                        <View>
                            <Text style={styles.headerTwo}>Doğum Tarihi</Text>
                            <Pressable style={styles.dateContainer} onPress={() => {setModalVisible(true),showMode('date')}}>
                                <Text style={styles.date}>{text === 'Empty' ? '' : text}</Text>
                            </Pressable>
                            {show && (Platform.OS !== "ios") && (
                                <DateTimePicker
                                    testID='dateTimePicker'
                                    value={date}
                                    mode='date'
                                    display='spinner'
                                    onChange={onChange}
                                />
                            )}
                            {show && (Platform.OS === "ios") && (
                                <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <View style={{height: height * 0.7, width: width * 0.8, backgroundColor: 'white'}}>
                                            <DateTimePicker
                                                testID='dateTimePicker'
                                                value={date}
                                                mode='date'
                                                display='spinner'
                                                onChange={onChange}
                                                style={{height: 400, width: width * 0.8}}
                                            />                                        
                                            <Pressable
                                                style={({pressed}) => [{
                                                    backgroundColor: pressed 
                                                    ? '#8BE686'
                                                    : '#36d42d'
                                                },
                                                    styles.buttonModal, styles.button]}
                                                onPress={() => {
                                                    setModalVisible(!modalVisible)
                                                    onChange(date)
                                                }}
                                            >
                                                <Text style={styles.textStyle}>Tamam</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            )}
                        </View>
                        <View>
                            <Text style={styles.headerTwo}>TC No </Text>
                            <TextInput  
                                style={styles.phoneInput}
                                keyboardType= 'phone-pad'
                                defaultValue={tc}
                                onChangeText={newTc => setTc(newTc)}
                            />
                        </View>
                    </View>
                    <View>
                        <Pressable onPress={onButtonPressed} style={({pressed}) => [{
                                backgroundColor: pressed 
                                ? '#81E47C'
                                : '#36d42d'
                            },
                            styles.button]}>
                            <Text style={styles.buttonInner}>BAŞLA</Text>
                        </Pressable>
                        <Text style={styles.testimonial}>*Kullanıcı sözleşmesini kabul ediyorum</Text>
                    </View>
                </View>
            </View>
        </DismissKeyboard>
        

    );
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#16234e",
        
    },
    logo: {
        width: '60%',
        maxWidth: '85%',
        maxHeight: 300,
        flex: 0.2

    },
    headerOne: {
        color: "white",
        fontSize: 24,
        textAlign: 'center',
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "300",
        fontFamily: 'ProximaNova_Bold',
    },
    headerTwo: {
        color: "white",
        fontSize: 18,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "300",
        fontFamily: 'ProximaNova_Bold',
    },
    phoneInput: {
        backgroundColor: "white",
        borderRadius: 12,
        height: 50,
        paddingLeft: 20,
        marginBottom: 10,
        fontFamily: 'ProximaNova_Bold',
    },
    screenContent: {
        flex: 0.8,
        justifyContent: 'space-between',
        width: '80%',
        height: height * 0.7
        
    },
    button: {
        alignItems: 'center',
        width: "100%",
        padding: 10,
        borderRadius: 12,
        // marginBottom: 29
        
    },
    buttonInner: {
        color: 'white',
        fontWeight: '600',
        fontSize: 24,
        fontFamily: 'ProximaNova_Bold',
        

    },
    testimonial: {
        color: '#16234e',
        marginTop: 10,

    },
    dateContainer: {
        backgroundColor: 'white',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        marginBottom: 10

    },
    date: {
        color: "black",
        fontSize: 18,
        padding: 4,
        marginRight: 10,
        marginLeft: 10,
        fontWeight: "600",
        fontFamily: 'ProximaNova_Bold',
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(44,55,95,0.9)',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12
    },
    modalView: {
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 100,
            height: 102
        },
        shadowOpacity: 1.0,
        shadowRadius: 400,
        elevation: 5
    },
    buttonModal: {
        borderRadius: 12,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 40,
        paddingLeft: 40,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "700",
        textAlign: "center"
    },
});

export default UserAuth; //mapDispatchToProps mapStateToProps