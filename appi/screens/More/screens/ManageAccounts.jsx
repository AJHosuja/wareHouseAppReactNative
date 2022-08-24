import { View, Text, SafeAreaView, StyleSheet, Button, TouchableOpacity, TextInput, Platform, Keyboard, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../../../features/userSlice";
import axios from "axios";
import { useIsFocused } from '@react-navigation/native'
import CustomModal from '../../alert/CustomModal';

const ManageAccounts = () => {
    const [allUsers, setAllUsers] = useState([])
    const [addUser, setAdduser] = useState(false)
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const token = useSelector(selectToken)
    const [alertVisible, setAlertVisible] = useState(false);

    const getAllProducts = async () => {
        const config = {
            headers: {
                Authorization: `Basic ${token}`,
            },
        };
        const url = "https://warehouseapipower.herokuapp.com" + "/usermgn";
        const dataGet = await axios.get(url, config);

        setAllUsers(dataGet.data)
    }

    useEffect(() => {
        getAllProducts();
    }, [useIsFocused])

    ///////////////////////////////////////////////////////////////////////////////
    // ADD user


    const submit = async () => {

        var details = {
            userName: user,
            password: password,
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

        const URL = "https://warehouseapipower.herokuapp.com" + "/usermgn/";
        const addUserResponse = await axios.post(URL, formBody, config);
        getAllProducts();
        if (addUserResponse.data) {
            console.log(addUserResponse.data)
            setUser("")
            setPassword("")
            setAlertVisible(true)
            setTimeout(() => {
                setAlertVisible(false);
            }, 1500)
        }
    };


    //////////////////////////////////////////////////////////////////////////////////////


    const deleteUser = async (id, username) => {

        Alert.alert(
            "Confirm",
            username + " account will be deleted",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {

                        console.log("OK Pressed")
                        const config = {
                            headers: {
                                Authorization: `Basic ${token}`,
                            },
                        };
                        const url = "https://warehouseapipower.herokuapp.com" + "/usermgn/" + id;
                        const deleteData = await axios.delete(url, config);
                        if (deleteData.data) {
                            getAllProducts();
                            setAlertVisible(true)
                            setTimeout(() => {
                                setAlertVisible(false);
                            }, 1500)
                        }
                    }
                }
            ]
        );


    };


    ///////////////////////////////////////////////////////////////////////////////////////////////
    /////                   Reset password to qwerty


    const resetPassWord = async (id, username) => {
        console.log("here")
        Alert.alert(
            "Confirm",
            username + "'s password will be reseted to 1234",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {

                        var details = {
                            id: id,
                            newPassword: "1234",
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

                        const URL = "https://warehouseapipower.herokuapp.com" + "/usermgn/" + "resetPass";
                        const passwordReseteResponse = await axios.post(URL, formBody, config);
                        if (passwordReseteResponse.data === true) {
                            console.log(passwordReseteResponse.data)
                            setAlertVisible(true)
                            setTimeout(() => {
                                setAlertVisible(false);
                            }, 1500)
                        } else {

                        }
                    }
                }
            ]
        );


    };

    return (
        <SafeAreaView style={styles.container}>
            {alertVisible
                &&
                <CustomModal title={"Success!"} isVisible={alertVisible} jsonPath={require('../../alert/assets/success1.json')} />
            }
            <ScrollView>
                {addUser ? (
                    <TouchableOpacity style={styles.addAccount} onPress={() => setAdduser(!addUser)}>
                        <Text style={styles.addAccountButton}>Cancel</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.addAccount} onPress={() => setAdduser(!addUser)}>
                        <Text style={styles.addAccountButton}>Add an account</Text>
                    </TouchableOpacity>
                )
                }
                {addUser &&
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.keyboardAvoid}>
                        <View style={styles.addAccountForm}>
                            <TextInput
                                placeholder='Username'
                                autoCapitalize='none'
                                style={styles.addAccountFormInput}
                                onChangeText={setUser}
                                value={user}
                            />

                            <TextInput placeholder='Password'
                                autoCapitalize='none'
                                style={styles.addAccountFormInput}
                                secureTextEntry={true}
                                onChangeText={setPassword}
                                value={password}
                            />

                            <TouchableOpacity style={styles.addAccountSubmit} onPress={submit}>
                                <Text style={styles.addAccountButton}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                }
                <View>
                    <Text style={styles.HeaderText}>All Users</Text>
                </View>
                <View style={styles.usersBox}>
                    {allUsers.map((data, index) => {

                        if (data.admin) {
                            return (
                                <View style={styles.contentRow} key={index}>
                                    <View style={styles.userName}>
                                        <Text style={styles.userNameText}>{data.username}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={styles.buttonContainer}>
                                            <Text style={styles.buttonText}>admin</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={styles.buttonContainer}>
                                            <Text style={styles.buttonText}></Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        } else {
                            return (
                                <View style={styles.contentRow} key={index}>
                                    <View style={styles.userName}>
                                        <Text style={styles.userNameText}>{data.username}</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={styles.buttonContainer} onPress={() => resetPassWord(data.idusers, data.username)}>
                                            <Text style={styles.buttonText}>Reset pass</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity style={styles.buttonContainer} onPress={() => deleteUser(data.idusers, data.username)}>
                                            <Text style={styles.buttonText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }

                    })}
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#478bff",
        height: "100%",
        width: "100%",
        alignItems: "center"
    },
    usersBox: {
        backgroundColor: "white",
        width: 350,
        borderRadius: 5,
        marginTop: 10,
        paddingBottom: 10
    },
    contentRow: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 3,
        flexDirection: "row"
    },
    userNameText: {
        fontSize: 22
    },
    userName: {
        flex: 1,
        paddingLeft: 10
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "blue",
        fontSize: 17
    },
    HeaderText: {
        fontSize: 30,
        marginTop: 40
    },
    addAccount: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 350,
        backgroundColor: "white",
        marginTop: 30,
        borderRadius: 40,
    },
    addAccountButton: {
        fontSize: 25
    },
    addAccountForm: {
        backgroundColor: "white",
        width: 350,
        marginTop: 30,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    addAccountFormInput: {
        backgroundColor: "lightgrey",
        borderRadius: 4,
        marginBottom: 10,
        height: 50,
        paddingLeft: 20,
        fontSize: 20
    },
    keyboardAvoid: {
        flex: 1
    },
    addAccountSubmit: {
        height: 50,
        backgroundColor: "#3489eb",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default ManageAccounts