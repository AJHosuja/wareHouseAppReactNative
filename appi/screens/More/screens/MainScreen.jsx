import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux"
import { selectAdmin } from "../../../features/userSlice";
import { NavigationHelpersContext } from '@react-navigation/native';

const MainScreen = ({ setLoggedIn, navigation }) => {
  const [admin, setAdmin] = useState(useSelector(selectAdmin))


  const logOut = () => {
    setLoggedIn(false)
    AsyncStorage.clear();

  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity>
        <View>
          <Text></Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={logOut}>
        <View>
          <Text>Log Out</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Change password")}>
        <View>
          <Text>Change password</Text>
        </View>
      </TouchableOpacity>
      {admin &&
        <>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Manage accounts")}>
            <View>
              <Text>Manage accounts</Text>
            </View>
          </TouchableOpacity>


        </>
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#478bff",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  button: {
    backgroundColor: "white",
    height: 40,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 20
  }
});

export default MainScreen