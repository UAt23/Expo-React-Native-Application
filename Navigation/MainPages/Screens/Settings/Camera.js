import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
// import { shareAsync } from 'expo-sharing';
// import * as MediaLibrary from 'expo-media-library';


const popAction = StackActions.pop(1);

const CameraComponent = () => {
    const navigation = useNavigation();
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

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

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    const closeCamera = () => {
        navigation.dispatch(popAction);
    }

    if (photo) {

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Pressable style={styles.discardButton} onPress={() => setPhoto(undefined)}><Text style={{color: "white", fontSize: 24, fontWeight: "700",}}>Yeniden Çek</Text></Pressable>
                <Pressable style={styles.sendButton} onPress={() => setPhoto(undefined)}><Text style={{color: "white", fontSize: 24, fontWeight: "700",}}>Gönder</Text></Pressable>
                <Pressable style={styles.closeButton} onPress={closeCamera}><Text style={{color: "white", fontSize: 24, fontWeight: "700",}}>Kapat</Text></Pressable>
                {/* <Button title="Discard" onPress={() => setPhoto(undefined)} /> */}
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <Pressable style={styles.closeButton} onPress={closeCamera}><Text style={{color: "white", fontSize: 24, fontWeight: "700",}}>Kapat</Text></Pressable>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.cameraButton} title="Take Pic" onPress={takePic}>
                    <Pressable style={styles.cameraButtonInner} onPress={takePic}>

                    </Pressable>
                </Pressable>
            </View>
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