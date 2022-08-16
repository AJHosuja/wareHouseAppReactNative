import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from './ItemCard';
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from '../../../features/userSlice';

const ItemData = ({ navigation, route }) => {
    const elguide = route.params.elguide
    const [data, setData] = useState([]);

    const token = useSelector(selectToken)
    
    
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
        }
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