import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch } from "react-redux";
import { addToken, addUpdater, addAdmin } from "../features/userSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from "./alert/CustomModal";
import { API_URL } from "@env"

const Login = ({ setLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const dispatch = useDispatch();
  let isMounted = true;


  useEffect(() => {
    console.log(API_URL)
    return () => {
      isMounted = false;
    };
  }, [])


  const loginRequest = () => {
    setIsLoading(true)
    var details = {
      user: userName,
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
      },
    };

    const loginURL = API_URL + "/login";
    axios.post(loginURL, formBody, config).then((response) => {
      console.log(response.data)
      if (response.data.token) {
        if (isMounted) {
          dispatch(addAdmin(response.data.admin));
          dispatch(addToken(response.data.token));
          dispatch(addUpdater(response.data.userName));
          const token = response.data.token;
          AsyncStorage.setItem('token', token);
          AsyncStorage.setItem('userName', response.data.userName);
          setLoggedIn(true);
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
        setAlertVisible(true)
        setTimeout(() => {
          setAlertVisible(false);
        }, 1500)
      }
    });



  }

  return (
    <View style={styles.container}>
      {isLoading &&
        <Spinner visible={true} />
      }
      {alertVisible
        &&
        <CustomModal title={"Invalid!"} isVisible={alertVisible} jsonPath={require("./alert/assets/failed.json")} />
      }
      <View>
        <Text style={styles.headerText}>
          Warehouse {"\n"} Inventory
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor="#b5b5b5"
        onChangeText={setUserName}
        value={userName}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b5b5b5"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
        autoCapitalize='none'
      />
      <TouchableOpacity style={styles.button} onPress={loginRequest}>
        <Text>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#478bff",
    flex: 1,
    alignItems: "center",
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

export default Login;
