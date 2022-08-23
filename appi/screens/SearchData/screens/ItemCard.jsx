import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from '../../../features/userSlice';
import axios from "axios";

const ItemCard = ({itemData, deleteFunction, index, updateArray, ifupdateArray}) => {

  const [updateRack, setUpdateRack] = useState(false)
  const [value, setValue] = useState(itemData.rack)
  const token = useSelector(selectToken)

  const updateRackRequest = (id) => {
    const updateItem = async (id) => {
      var details = {
        newRack: value,
        id: id,
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
          'Authorization': `Basic ${token}`
        },
      };
  
      const URL = "https://warehouseapipower.herokuapp.com" + "/product/updateRack";
  
      const requestData = await axios.post(URL, formBody, config);

      if(requestData.data==="true") {
        return true;
      }
      
    }
    
    const succes = updateItem(id);

    if(succes) {
      setUpdateRack(false)
      if (ifupdateArray) {
        updateArray();
      }
    }
    
  };

  return (
    <View style={styles.card}>
            <Text style={styles.textInCard}>
              elguide: 
              <Text style={{fontWeight: "bold"}}>{" "}{itemData.elguideCode.toUpperCase()}</Text>
            </Text>
            <Text style={styles.textInCard}>
              EAN: 
              <Text style={{fontWeight: "bold"}}> ..{itemData.productEAN.substr(itemData.productEAN.length - 5)}</Text>
            </Text>
            <View style={styles.inputTextContainer}>
            <Text style={styles.textInCard}>
              rack: 
              </Text>
              {!updateRack ?
              <Text style={[styles.textInCard, {fontWeight: "bold"}]}>{value}</Text>
              :
              
              <TextInput
              style={styles.inputStyle}
              onChangeText={(e) => {
                setValue(e)
              }}
              value={value}
              /> 
              
              }

              {updateRack && 
              <TouchableOpacity onPress={() => updateRackRequest(itemData.id)}>
                    <Text style={styles.updateButton}>Update</Text>
                </TouchableOpacity>
                }
              </View>
            <Text style={styles.textInCard}>
              updater: 
              <Text style={{fontWeight: "bold"}}>{" "}{itemData.updater}</Text>
            </Text>
            <View style={styles.buttons}>
            
                <TouchableOpacity style={styles.delete} onPress={() => {
                  deleteFunction(index, itemData.id)
                }}>
                    <Text style={styles.buttonsText}>Delete</Text>
                </TouchableOpacity>
              
                {!updateRack ? 
                <TouchableOpacity onPress={() => setUpdateRack(true)}>
                    <Text style={styles.buttonsText}>Update Rack</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => setUpdateRack(false)}>
                    <Text style={styles.buttonsText}>Cancel</Text>
                </TouchableOpacity>
                }
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    card: {
      marginTop: 10,
      marginBottom: 10,
      width: 340,
      backgroundColor: "white",
      borderRadius: 4,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInCard: {
      marginTop: 10,
      fontSize: 18,
    },
    buttons: {
        width: 370,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
    }, 
    buttonsText:{
        color: "blue",
        fontSize: 18,
        marginBottom: 7,
    },
    updateButton: {
      color: "blue",
      fontSize: 18,
      marginLeft: 10,
      marginTop: 7
    },
    inputStyle: {
      backgroundColor: "#DDDDDD",
      height: 25,
      width: 90,
      paddingLeft: 3,
      fontWeight: "bold",
      marginTop: 7,
      marginLeft: 5,
      borderWidth: 1,
      borderRadius: 2,
      fontSize: 20
    },
    inputTextContainer: {
      flexDirection: "row"
    }
  });
  

export default ItemCard