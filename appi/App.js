import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import React, { useState, useEffect } from "react";
import Home from "./Home.js";

export default function App() {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return <Home token={token} />;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login setToken={setToken} setLoggedIn={setLoggedIn} />
    </View>
  );
}
