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
import qs from "qs";

const Login = ({ setToken, setLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
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

    const loginURL = "https://warehouseapipower.herokuapp.com" + "/login";

    const loginData = await axios.post(loginURL, formBody, config);
    if (loginData) {
      setToken(loginData.data.token);
      console.log(loginData.data.token);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  return (
    <View>
      <Spinner visible={isLoading} />
      <Text>User Name</Text>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        onChangeText={setUserName}
        value={userName}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    borderRadius: 2,
    margin: 1,
    paddingLeft: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default Login;
