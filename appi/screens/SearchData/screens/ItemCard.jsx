import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'

const ItemCard = ({itemData, deleteFunction, index}) => {

  const [updateRack, setUpdateRack] = useState(false)
  const [value, setValue] = useState("")

  const inputRef = useRef();

  useEffect(() => {
      console.log({inputRef})
    }, [])

  return (
    <View style={styles.card}>
            <Text style={styles.textInCard}>
              elguide: 
              <Text style={{fontWeight: "bold"}}>{" "}{itemData.elguideCode}</Text>
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
              <Text style={[styles.textInCard, {fontWeight: "bold"}]}>{itemData.rack}</Text>
              :
              
              <TextInput
              ref={inputRef}
              style={styles.inputStyle}
              onChangeText={(e) => {
                setValue(e)
              }}
              value={value}
              /> 
              
              }
              </View>
            <Text style={styles.textInCard}>
              updater: 
              <Text style={{fontWeight: "bold"}}>{" "}{itemData.updater}</Text>
            </Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.delete} onPress={() => {
                  deleteFunction(index)
                }}>
                    <Text style={styles.buttonsText}>Delete</Text>
                </TouchableOpacity>
                {!updateRack ? 
                <TouchableOpacity onPress={() => setUpdateRack(true)}>
                    <Text style={styles.buttonsText}>Update Rack</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => setUpdateRack(false)}>
                    <Text style={styles.buttonsText}>Ok</Text>
                </TouchableOpacity>
                }
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    card: {
      marginTop: 10,
      marginBottom: 40,
      width: 370,
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