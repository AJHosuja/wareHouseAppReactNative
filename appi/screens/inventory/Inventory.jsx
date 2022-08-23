import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../../features/userSlice";
import { useState } from 'react';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import axios from "axios";
import ItemCard from '../SearchData/screens/ItemCard';
import { useIsFocused } from '@react-navigation/native'
import CustomModal from '../alert/CustomModal';




const Inventory = () => {
  const token = useSelector(selectToken)
  const [letter, setLetter] = useState('A');
  const [number1, setNumber1] = useState('1');
  const [number2, setNumber2] = useState('1');
  const [rack, setRack] = useState(letter+number1+number2);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const [alertVisible, setAlertVisible] = useState(false);


  

  const getAllProducts = async () => {
    const config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };
    const url = "https://warehouseapipower.herokuapp.com" + "/product/all/";
    const dataGet = await axios.get(url, config);
    
    setData(dataGet.data)
  }
  
  useEffect(() => {
    getAllProducts();
  },[isFocused])


  const deleteFromArray = (index, id) => {
      const deleteRequest = async (id) => {
      const config = {
        headers: {
          'Authorization': `Basic ${token}`
        },
      };
  
      const URL = "https://warehouseapipower.herokuapp.com" + "/product/" + id;
      const requestData = await axios.delete(URL, config);
      if(requestData.data==="true") {
        return true;
      }
    };
    const success = deleteRequest(id);
    if(success) {
      setData(data.filter((o, i) => index !== i));
      setAlertVisible(true)
      setTimeout( () => {
        setAlertVisible(false);
      }, 1000)
    }
    
};
  


  
  return (
    <SafeAreaView style={styles.container}>
       {alertVisible 
      &&
      <CustomModal title={"Success!"} isVisible={alertVisible} jsonPath={require('../alert/assets/success1.json')}/>
      }
        <View>
          <Text style={styles.welcomeText}>
            Find items by rack
          </Text>
        </View>
        <ScrollView style={styles.ScrollView}>
          <View style={styles.ScrollViewView}>

      <ButtonToggleGroup
        textStyle={{fontSize: 20, color: "black"}}
        style={styles.buttonGroup1}
        highlightBackgroundColor={'blue'}
        highlightTextColor={'white'}
        inactiveBackgroundColor={'transparent'}
        inactiveTextColor={'black'}
        values={['A', 'B', 'C', 'D']} 
        value={letter}
        onSelect={letter => {
          setLetter(letter)
          setRack(letter + number1 + number2)
        }}
        />

      <ButtonToggleGroup
        textStyle={{fontSize: 20, color: "black"}}
        style={styles.buttonGroup2}
        highlightBackgroundColor={'blue'}
        highlightTextColor={'white'}
        inactiveBackgroundColor={'transparent'}
        inactiveTextColor={'black'}
        values={['1', '2', '3', '4', '5']}
        value={number1}
        onSelect={number1 => 
          {
            setNumber1(number1) 
            setRack(letter + number1 + number2)
          }
        }
        />

      <ButtonToggleGroup
        textStyle={{fontSize: 20, color: "black"}}
        style={styles.buttonGroup2}
        highlightBackgroundColor={'blue'}
        highlightTextColor={'white'}
        inactiveBackgroundColor={'transparent'}
        inactiveTextColor={'black'}
        values={['1', '2', '3', '4','5', '6', '7', '8']}
        value={number2}
        onSelect={number2 => 
          {
            setNumber2(number2)
            setRack(letter + number1 + number2)
          }}
          />
        <View style={styles.rackText}>
          <Text style={styles.rackTextText}>{rack}</Text>
        </View>
          {data.map((data1, index) => {
            if(data1.rack === rack) {
              return(
                <ItemCard itemData={data1} 
                deleteFunction={deleteFromArray} 
                index={index} 
                key={index} 
                updateArray={getAllProducts}
                ifupdateArray={true}
                />
                )
              }
              
            })}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  welcomeText: {
    marginTop: 40,
    fontSize: 30,
  },
  container:{
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#478bff"
  },
  buttonGroup1: {
    marginTop: 40,
    height: 40,
    width: 300,
    backgroundColor: "white",
    borderRadius: 5
  },
  buttonGroup2: {
    marginTop: 20,
    height: 40,
    width: 300,
    backgroundColor: "white",
    borderRadius: 5
  },
  rackText: {
    marginTop: 20,
    borderRadius: 5,
    width: 120,
    height: 40,
    backgroundColor: "white",
    justifyContent:"center",
    alignItems: "center"
  },
  rackTextText: {
    fontSize: 30,
  },
  ScrollView: {
    marginTop: 5,
    width: "100%",
  },
  ScrollViewView: {
    alignItems: "center"
  }
});

export default Inventory