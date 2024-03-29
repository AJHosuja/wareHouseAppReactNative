import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import Close from "react-native-vector-icons/AntDesign";
import { selectToken } from "../../../features/userSlice";
import { useIsFocused } from '@react-navigation/native';
import {API_URL} from "@env"


const SearchData = ({ navigation }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [typedWord, setTypedWord] = useState("");
  const [filteredData, setFiltereData] = useState([]);
  const token = useSelector(selectToken)
  const isFocused = useIsFocused();

  const getData = async () => {
    const config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };

    const url = API_URL + "/product/";

    const dataGet = await axios.get(url, config);
    setAllProducts(dataGet.data);
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  const filterData = (e) => {
    const searchWord = e;
    setTypedWord(searchWord);

    const newFilter = allProducts.filter((val) => {
      return val.elguideCode.toLowerCase().includes(searchWord.toLowerCase());
    });

    const filteredDataNew = newFilter.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        newFilter.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    if (searchWord === "") {
      setFiltereData([]);
    } else {
      setFiltereData(filteredDataNew);
    }
  };

  const clearInputField = () => {
    setFiltereData([]);
    setTypedWord("");
  };
  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{backgroundColor: "#478bff", height: "100%" , width: "100%"}}>

    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          autoCapitalize={"characters"}
          onChangeText={filterData}
          value={typedWord}
          placeholder="Search"
          />
        {typedWord.length > 0 && (
          <View style={styles.closeIcon}>
            <TouchableOpacity onPress={clearInputField}>
              <Close name="close" size={30} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView style={[styles.scrollView, styles.shadow]}>
        <View style={styles.filteredData}>
          {filteredData.map((value, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => navigation.navigate("ItemData", { elguide: value.elguideCode, token: token })}>
                <Text style={styles.filteredDataText} >
                  {value.elguideCode.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
    </View>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 100,

  },
  inputStyle: {
    backgroundColor: "white",
    width: 265,
    borderRadius: 10,
    height: 50,
    paddingLeft: 20,
    fontSize: 20,
  },
  filteredDataText: {
    paddingTop: 5,
    fontSize: 20,
  },
  filteredDataText: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 10,
    paddingBottom: 10,
  },
  scrollView: {
    backgroundColor: "white",
    width: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  closeIcon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width: 300,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default SearchData;
