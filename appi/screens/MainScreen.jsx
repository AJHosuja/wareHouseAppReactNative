import { View, Text } from 'react-native'
import Login from "./Login";
import React, { useState, useEffect } from "react";
import Home from "../Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToken, addUpdater } from "../features/userSlice";
import Spinner from "react-native-loading-spinner-overlay";


const MainScreen = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);


  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const userName = await AsyncStorage.getItem("userName");
    
    if (token !== null && userName !== null) {
      setIsLoading(true)
      const config = {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };
      const url =
      "https://warehouseapipower.herokuapp.com" + "/token/" + userName;
      const tokenValidation = await axios.get(url, config);
      if (tokenValidation.data.success) {
        
        dispatch(addToken(tokenValidation.data.token));
        dispatch(addUpdater(tokenValidation.data.user));
        await AsyncStorage.setItem("token", tokenValidation.data.token);
        setIsLoading(false)
        setLoggedIn(true);
      }
    } else {
      setIsLoading(false)
      setLoggedIn(false);
    }
    
  };

  useEffect(() => {
    getToken();
  }, []);

  if (loggedIn) {
  return <Home setLoggedIn={setLoggedIn}/>;
  } else {
    return (
        <>
        {isLoading &&
          <Spinner visible={true} />
        }
        <Login setLoggedIn={setLoggedIn} />
        </>
    )
  }

  
}

export default MainScreen