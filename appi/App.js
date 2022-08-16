import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import React, { useState, useEffect } from "react";
import Home from "./Home.js";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      {!loggedIn ? (
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
        <Home token={token} />
      )}
    </Provider>
  );
}
