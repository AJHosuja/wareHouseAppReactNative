import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux"
import { selectAdmin } from "../../features/userSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from './screens/MainScreen';
import ManageAccounts from './screens/ManageAccounts';
import ChangePassWord from './screens/ChangePassWord';

const More = ({ setLoggedIn }) => {
  const Stack = createNativeStackNavigator();


  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {(props) => <MainScreen {...props} setLoggedIn={setLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen
        name="Manage accounts"
      >{(props) => <ManageAccounts {...props} />}</Stack.Screen>
      <Stack.Screen
        name="Change password"
      >{(props) => <ChangePassWord {...props} />}</Stack.Screen>
    </Stack.Navigator>


  )
}


export default More