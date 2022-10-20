import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from './ItemCard';
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from '../../../features/userSlice';
import CustomModal from '../../alert/CustomModal';
import { API_URL } from "@env"

const ItemData = ({ navigation, route }) => {
  const elguide = route.params.elguide
  const [data, setData] = useState([]);
  const [mappingData, setMappingData] = useState([]);

  const token = useSelector(selectToken)
  const [alertVisible, setAlertVisible] = useState(false);

  const getItemData = async () => {
    const config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };

    const url = API_URL + "/product/elguide/" + elguide;

    const dataGot = await axios.get(url, config);

    setMappingData(dataGot.data)
    setData(dataGot.data);
  };

  useEffect(() => {
    getItemData();
  }, []);

  const deleteFromArray = (index, id) => {
    setData(mappingData.map((data1, index) => {
      return (
        <ItemCard itemData={data1} />
      )
    }));
    const deleteRequest = async (id) => {

      const config = {
        headers: {
          'Authorization': `Basic ${token}`
        },
      };

      const URL = API_URL + "/product/" + id;

      const requestData = await axios.delete(URL, config);

      if (requestData.data === "true") {
        return true;
      }
    };


    const success = deleteRequest(id);
    if (success) {
      const filteredData = data.filter((o, i) => index !== i);
      setData(filteredData);
      console.log(filteredData.length)
      setAlertVisible(true)
      setTimeout(() => {
        setAlertVisible(false);
        if (filteredData.length === 0) {
          navigation.navigate("Search")
        }
      }, 1000)

    }
  };
  //////////////////
  // Generates random key for element
  const toKey = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <SafeAreaView >

      {alertVisible
        &&
        <CustomModal title={"Success!"} isVisible={alertVisible} jsonPath={require('../../alert/assets/success1.json')} />
      }

      <View style={styles.container}>
        <ScrollView>
          {data.map((data1, index) => {
            return (
              <ItemCard key={toKey(3)} itemData={data1} deleteFunction={deleteFromArray} index={index} />
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