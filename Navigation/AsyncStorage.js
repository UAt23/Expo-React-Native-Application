import AsyncStorage from '@react-native-async-storage/async-storage'


export const saveToken = async token => {
    try {
        const userToken = token;
        await AsyncStorage.setItem("token", userToken);
        // alert("data_saved")
    } catch(error) {
        alert(error)
    }
}
export const saveRuhsatOn = async ruhsatOn => {
    try {
        const userToken = ruhsatOn;
        await AsyncStorage.setItem("ruhsatOn", userToken);
        alert("data_saved")
    } catch(error) {
        alert(error)
    }
}
export const saveRuhsatArka = async ruhsatArka => {
    try {
        const userToken = ruhsatArka;
        await AsyncStorage.setItem("ruhsatArka", userToken);
        alert("data_saved")
    } catch(error) {
        alert(error)
    }
}
export const saveSigorta = async sigorta => {
    try {
        const userToken = sigorta;
        await AsyncStorage.setItem("sigorta", userToken);
        alert("data_saved")
    } catch(error) {
        alert(error)
    }
}
export const saveMuayene = async muayene => {
    try {
        const userToken = muayene;
        await AsyncStorage.setItem("muayene", userToken);
        alert("data_saved")
    } catch(error) {
        alert(error)
    }
}
export const savePermission = async permission => {
    try {
        const userToken = permission;
        await AsyncStorage.setItem("permission", userToken);
    } catch(error) {
        alert(error)
    }
}

