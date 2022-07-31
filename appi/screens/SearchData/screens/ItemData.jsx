import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from './ItemCard';

const ItemData = ({ navigation, route }) => {
    const elguide = route.params.elguide
    const token = route.params.token

    const [data, setData] = useState([]);
    
    
    const getItemData = async () => {
      const config = {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };
      
      const url = "https://warehouseapipower.herokuapp.com" + "/product/elguide/" + elguide;
      console.log(url)
      const dataGot = await axios.get(url, config);
      console.log("here");
      console.log(dataGot.data);
      setData(dataGot.data);
    };

    useEffect(() => {
      getItemData();
    }, []);

    const deleteFromArray = (index) => {
        console.log(index);
        setData(data.filter((o, i) => index !== i));
        console.log(data)
    };

  return (
    <SafeAreaView >

    <View style={styles.container}>
      <ScrollView>

      {data.map((data1, index) => {
        return(
          <ItemCard key={index} itemData={data1} deleteFunction={deleteFromArray} index={index}/>
          )
        })}
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  
export default ItemData