import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from './ItemCard';
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from '../../../features/userSlice';
import CustomModal from '../../alert/CustomModal';

const ItemData = ({ navigation, route }) => {
    const elguide = route.params.elguide
    const [data, setData] = useState([]);

    const token = useSelector(selectToken)
    const [alertVisible, setAlertVisible] = useState(false);
    
    const getItemData = async () => {
      const config = {
        headers: {
          Authorization: `Basic ${token}`,
        },
      };
      
      const url = "https://warehouseapipower.herokuapp.com" + "/product/elguide/" + elguide;
      
      const dataGot = await axios.get(url, config);
      
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
          const filteredData= data.filter((o, i) => index !== i);
          setData(filteredData);
          console.log(filteredData.length)
          setAlertVisible(true)
            setTimeout( () => {
              setAlertVisible(false);
              if(filteredData.length === 0) {
                navigation.navigate("Search")
              }
            }, 1000)
          }
        };


  return (
    <SafeAreaView >

      {alertVisible 
      &&
      <CustomModal title={"Success!"} isVisible={alertVisible} jsonPath={require('../../alert/assets/success1.json')}/>
      }

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