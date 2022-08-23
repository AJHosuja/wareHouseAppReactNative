import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../../../features/userSlice";
import axios from "axios";
import { useIsFocused } from '@react-navigation/native'
import { isFulfilled } from '@reduxjs/toolkit';

const ManageAccounts = () => {
    const [allUsers, setAllUsers] = useState([])
    const token = useSelector(selectToken)

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
      },[useIsFocused])

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.usersBox}>
      {allUsers.map((data, index) => {

        if(data.admin) {
            return(
                <View style={styles.contentRow}>
                    <View style={styles.userName}>
                  <Text style={styles.userNameText}>{data.username}</Text>
                    </View>
                    <View style={{flex: 1}}> 
                  <Button title="Reset pass"></Button>
                    </View>
                    <View style={{flex: 1}}> 
                        <Button title="admin"></Button>
                    </View>
                </View>
                  )
        } else {
            return(
              <View style={styles.contentRow}>
                  <View style={styles.userName}>
                <Text style={styles.userNameText}>{data.username}</Text>
                  </View>
                  <View style={{flex: 1}}> 
                <Button title="Reset pass"></Button>
                  </View>
                  <View style={{flex: 1}}> 
                      <Button title="Delete"></Button>
                  </View>
              </View>
                )
        }

            })}
    </View>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#478bff",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    usersBox: {
        backgroundColor: "white",
        width: 400,
        borderRadius: 5
    },
    contentRow: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 3,
        flexDirection: "row"
    },
    userNameText: {
        fontSize: 25
    },
    userName: {
        flex: 1,
        paddingLeft: 10
    }

  });

export default ManageAccounts