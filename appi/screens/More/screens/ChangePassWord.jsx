import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import React, { useState, useEffect } from "react";
import CustomModal from '../../alert/CustomModal';
import { useDispatch, useSelector } from "react-redux"
import { selectToken, selectUser } from "../../../features/userSlice";
import axios from "axios";

const ChangePassWord = () => {

    const token = useSelector(selectToken)
    const userName = useSelector(selectUser)


    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMsg, setAlertMsg] = useState("Success!");
    const [oldPassword, setOldPassword] = useState("");
    const [oldPassword2, setOldPassword2] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [jsonPath, setJsonPath] = useState(require("../../alert/assets/success1.json"));




    const changePass = async () => {
        if (oldPassword == oldPassword2) {
            if (newPassword.length >= 4) {

                var details = {
                    user: userName,
                    newPassword: newPassword,
                    password: oldPassword
                };

                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }

                formBody = formBody.join("&");
                const config = {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Authorization': `Basic ${token}`
                    },
                };

                const URL = "https://warehouseapipower.herokuapp.com" + "/usermgn/" + "changePass";
                const passwordChaneResponse = await axios.post(URL, formBody, config);

                if (passwordChaneResponse.data == true) {
                    setAlertMsg("Success!");
                    setJsonPath(require("../../alert/assets/success1.json"))
                    setAlertVisible(true)
                    setTimeout(() => {
                        setAlertVisible(false)
                        setAlertMsg("")
                    }, 3000)
                } else if (passwordChaneResponse.data === "wrongpassword") {
                    setAlertMsg("Wrong password");
                    setJsonPath(require("../../alert/assets/failed.json"))
                    setAlertVisible(true)
                    setTimeout(() => {
                        setAlertVisible(false)
                        setAlertMsg("")
                    }, 3000)
                } else if (passwordChaneResponse.data === "usernotfound") {
                    setAlertMsg("User not found");
                    setJsonPath(require("../../alert/assets/failed.json"))
                    setAlertVisible(true)
                    setTimeout(() => {
                        setAlertVisible(false)
                        setAlertMsg("")
                    }, 3000)
                }




            } else {
                setAlertMsg("Too short password");
                setAlertVisible(true)
                setJsonPath(require("../../alert/assets/failed.json"))
                setTimeout(() => {
                    setAlertVisible(false)
                    setAlertMsg("")
                }, 3000)
            }

        } else {
            setAlertMsg("Passwords has to match");
            setAlertVisible(true)
            setJsonPath(require("../../alert/assets/failed.json"))
            setTimeout(() => {
                setAlertVisible(false)
                setAlertMsg("")
            }, 3000)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                {alertVisible
                    &&
                    <CustomModal title={alertMsg} isVisible={alertVisible}
                        jsonPath={jsonPath} />
                }
                <TextInput
                    style={styles.input}
                    placeholder="Old Password"
                    placeholderTextColor="#b5b5b5"
                    secureTextEntry={true}
                    onChangeText={setOldPassword}
                    value={oldPassword}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Old Password"
                    placeholderTextColor="#b5b5b5"
                    secureTextEntry={true}
                    onChangeText={setOldPassword2}
                    value={oldPassword2}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    placeholderTextColor="#b5b5b5"
                    secureTextEntry={true}
                    onChangeText={setNewPassword}
                    value={newPassword}
                    autoCapitalize='none'
                />
                <TouchableOpacity style={styles.button} onPress={changePass}>
                    <Text>Change password</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#478bff",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        marginTop: 20,
        height: 50,
        width: 300,
        borderRadius: 10,
        margin: 1,
        paddingLeft: 10,
        color: "white",
        backgroundColor: "#465881"
    },
    button: {
        marginTop: 40,
        height: 50,
        width: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 40,
        marginTop: 150,
        marginBottom: 50
    }
});

export default ChangePassWord