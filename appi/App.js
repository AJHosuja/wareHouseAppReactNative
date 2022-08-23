import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import React, { useState, useEffect } from "react";
import Home from "./Home.js";
import { Provider } from "react-redux";
import { store } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToken } from "./features/userSlice";
import MainScreen from "./screens/MainScreen";

export default function App() {
  /*const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const userName = await AsyncStorage.getItem("userName");

    if (token !== null && userName !== null) {
      const config = {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };
      const url =
        "https://warehouseapipower.herokuapp.com" + "/token/" + userName;
      const tokenValidation = await axios.get(url, config);
      if (tokenValidation.data.success) {
        setLoggedIn(true);
        //dispatch(addToken(tokenValidation.data.token));
        await AsyncStorage.setItem("token", tokenValidation.data.token);
      }
    } else {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    const logged = getToken();
  }, []);*/

  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}

/*{!loggedIn ? (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Login setToken={setToken} setLoggedIn={setLoggedIn} />
  </View>
) : (
  <Home/>
)}*/
