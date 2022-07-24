import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch} from "react-redux";
import { saveRuhsatOn, saveRuhsatArka, saveSigorta, saveMuayene } from "../../../AsyncStorage";

// import { shareAsync } from 'expo-sharing';
// import * as MediaLibrary from 'expo-media-library';

export const SAVE_CAR = "SAVE_CAR";


export const saveCar = (type, pic) => ({
    type: SAVE_CAR,
    payload: {
        type,
        pic
    }
});

const popAction = StackActions.pop(1);

const CameraComponent = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch()
    let cameraRef = useRef();
    let bodyData;
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [picked, setPicker] = useState(false);
    const [authKey, setAuth] = useState();
    
    useEffect(() => {

        const printer = async () => {
            let auth = await AsyncStorage.getItem("token").then(userToken => {
                const state = userToken;
                return state;
            })
            console.log(auth)
            setAuth(auth)

        }
        printer()
    }, []);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Kamera Kullanımı İçin İzin İsteniliyor...</Text>
    } else if (!hasCameraPermission) {
        return (
            <View style={{margin: 10, paddingTop: 50,justifyContent: 'center', alignItems: 'center'}}>
                <Text>Kamera Kullanımı için izin verilmedi. Belge yükleyebilmek için izinleri güncellemelisiniz.</Text>
            </View>
        )
    }

    console.log('@@@@'+route.params.doc)

    let takePic = async () => {
        let options = {
            quality: 0.5,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto.base64);
    };

    const sendPhoto = () => {
        if (route.params.doc === "ruhsat1") {
            saveRuhsatOn(photo)
            navigation.navigate("AddNewCar", {vehicleId: null});
        } else if (route.params.doc === "ruhsat2") {
            saveRuhsatArka(photo)
            navigation.navigate("AddNewCar", {vehicleId: null});
        } else if (route.params.doc === "sigorta" ) {
            saveSigorta(photo)
            navigation.navigate("AddNewCar", {vehicleId: null});
        } else if (route.params.doc === "muayene") {
            saveMuayene(photo)
            navigation.navigate("AddNewCar", {vehicleId: null});
        } else {
            fetch(`http://44.206.43.168/api/upload_${route.params.doc}`, {
                method: 'POST',
                body: JSON.stringify({
                    [route.params.doc]: photo 
                }),
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    "Authorization": authKey
                }
            }).then(function(response){ 
                return response.json()})
                .then(function(data) {
                    // console.log(data)
                    if (data.status === "Success") {
                        navigation.navigate("Documents");
                        
                        
                    }
                }).catch(error => console.error('Error:', error)); 

        }
    }
    
    const closeCamera = () => {
        navigation.dispatch(popAction);
    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
        return;
    }
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            exif:false,
            base64: true,
            quality: 1,
        });
    
        // console.log("result");
        // console.log(result.base64);
    
        if (!result.cancelled) {
            setPhoto(result.base64);
            setPicker(true)
        }
    };
    if (photo) {
        // console.log(photo)

        return (
            <SafeAreaView style={styles.container}>
                {picked 
                    ? <Image source={{ uri: "data:image/jpg;base64," + photo }} style={styles.preview}  />
                    : <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo }} />}
                <Pressable style={styles.discardButton} onPress={() => setPhoto(undefined)}><Text style={{color: "white", fontSize: 24, fontWeight: "700",}}>Yeniden Çek</Text></Pressable>
                <Pressable style={styles.sendButton} onPress={() => sendPhoto()}><Text style={{color: "white", fontSize: 24, fontWeight: "700",}}>Gönder</Text></Pressable>
                <Pressable style={styles.closeButton} onPress={closeCamera}><Text style={{color: "white", fontSize: 24, fontWeight: "700",}}>Kapat</Text></Pressable>
                {/* <Button title="Discard" onPress={() => setPhoto(undefined)} /> */}
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <Pressable style={styles.closeButton} onPress={closeCamera}><Text style={{color: "white", fontSize: 24, fontWeight: "700", fontFamily: 'ProximaNova_Bold'}}>Kapat</Text></Pressable>
            <Pressable style={styles.pickButton} onPress={pickImage}><Text style={{color: "white", fontSize: 24, fontWeight: "700", fontFamily: 'ProximaNova_Bold'}}>Galeriden Seç</Text></Pressable>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.cameraButton} title="Take Pic" onPress={takePic}>
                    <Pressable style={styles.cameraButtonInner} onPress={takePic}>

                    </Pressable>
                </Pressable>
            </View>
            {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
            
            <StatusBar style="auto" />
        </Camera>
    );
}

export default CameraComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 5,
        justifyContent: "center"

    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
    cameraButton: {
        borderWidth: 4,
        borderColor: "white",
        borderRadius: 200,
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    cameraButtonInner: {
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#16234e",
        borderRadius: 200,
        width: 80,
        height: 80,
    },
    closeButton: {
        position: "absolute",
        top:30,
        right: 20,
    },
    pickButton: {
        position: "absolute",
        top:30,
        left: 20,
    },
    discardButton: {
        position: "absolute",
        bottom:30,
        left: 20,
        
    },
    sendButton: {
        position: "absolute",
        bottom:30,
        right: 20,
    }
});