import { View, Text, SafeAreaView , StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux"
import { selectAdmin } from "../../features/userSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from './screens/MainScreen';
import ManageAccounts from './screens/ManageAccounts';

const More = ({ setLoggedIn }) => {
  const Stack = createNativeStackNavigator();

    const logOut = () => {
        setLoggedIn(false)
        AsyncStorage.clear();
    }

  return (
    <Stack.Navigator >
        <Stack.Screen 
          name="Home"
          options={{headerShown: false}} 
        >
         {(props) => <MainScreen {...props} setLoggedIn={setLoggedIn}/>}
        </Stack.Screen>
      <Stack.Screen 
        name="manageAccounts"
      >{(props) => <ManageAccounts {...props}/>}</Stack.Screen>
      </Stack.Navigator>

    
  )
}


export default More