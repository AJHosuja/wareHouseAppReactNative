import { View, ScrollView, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { selectToken, selectUser } from '../../../features/userSlice';
import CustomModal from '../../alert/CustomModal';
import { useIsFocused } from '@react-navigation/native';
import { API_URL } from "@env"

const AddItem = ({ navigation, route }) => {
  const [data, setData] = useState([])
  const [elguide, setElguide] = useState("");
  const [ean, setEan] = useState("");
  const [rack, setRack] = useState("");
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)
  const isFocused = useIsFocused();
  const [lastFiveItems, setLastFiveItems] = useState([]);

  const [alertVisible, setAlertVisible] = useState(false);

  const [filteredData, setFiltereData] = useState([]);


  /////////////////////////////////////////////////////////////////////////////////////////////////

  const getLastFive = async () => {

    const config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };
    const url = API_URL + "/lastfive";
    const dataGet = await axios.get(url, config);
    setLastFiveItems(dataGet.data);
  };



  useEffect(() => {
    getLastFive();
  }, [isFocused])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // SearchData elguide


  const filterData = (e) => {
    const searchWord = e;
    setElguide(searchWord);

    const newFilter = data.filter((val) => {
      return val.elguide.toLowerCase().includes(searchWord.toLowerCase());
    })
    if (searchWord === "") {
      setFiltereData([]);
    } else {
      setFiltereData(newFilter);
    }
  };

  const clearInputField = () => {
    setFiltereData([]);
    setElguide("");
    setEan("");
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////
  // compare elguide data to ean

  const getEanWithElguide = (e) => {
    console.log(e)
    const ean = data.filter(elGuide => elGuide.elguide === elguide);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Ean-elguide Data


  const getData = async () => {

    const config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };
    const url = API_URL + "/product/eanelguide";
    const dataGet = await axios.get(url, config);
    setData(dataGet.data);
  };


  useEffect(() => {
    getData();
  }, [isFocused])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // params from barcode scanner

  useEffect(() => {
    if (route.params?.ean) {
      const elguideCode = data.filter(ean => ean.ean === route.params?.ean);
      setEan(route.params?.ean);
      if (elguideCode[0]?.elguide) {
        setElguide(elguideCode[0].elguide)
      }
    }
  }, [route.params?.ean])

  useEffect(() => {
    if (route.params?.rack) {
      setRack(route.params?.rack);
    }
  }, [route.params?.rack])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // Add item request
  const addItem = async () => {
    var details = {
      elguideCode: elguide,
      productEAN: ean,
      rack: rack,
      updater: user,
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

    const addItemURL = API_URL + "/product/";

    const addItemResponse = await axios.post(addItemURL, formBody, config);

    if (addItemResponse.data === "true") {
      return true;
    } else {
      return false;
    }
  }

  var addItemFunction = () => {

    Keyboard.dismiss();

    const responseData = addItem()

    if (responseData) {
      getData();
      getLastFive();
      setAlertVisible(true)
      setTimeout(() => {
        setAlertVisible(false);
      }, 1500)

    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safeArea} >

        {alertVisible
          &&
          <CustomModal title={"Success!"} isVisible={alertVisible} jsonPath={require('../../alert/assets/success1.json')} />
        }
        <View style={styles.formBox}>

          <View style={styles.header}>
            <Text style={{ fontWeight: "bold", fontSize: 30, paddingLeft: 40, paddingRight: 40 }}>Hey, Add Item </Text>
          </View>

          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputField}
              value={elguide.toUpperCase()}
              autoCapitalize={"characters"}
              onChangeText={filterData}
              placeholder='Elguide Code' />

            {elguide.length > 0 && (
              <View style={styles.closeIcon}>
                <TouchableOpacity onPress={clearInputField}>
                  <Ionicons name={"close"} style={{ fontSize: 30 }} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputField}
              autoCapitalize={'none'}
              onChangeText={(value) => setEan(value)}
              value={ean}
              placeholder='EAN' />
            <TouchableOpacity onPress={() => navigation.navigate({
              name: 'Barcode',
              params: { type: "ean" },
              merge: true,
            })}>
              <Ionicons name={"camera"} style={{ fontSize: 30 }} />
            </TouchableOpacity>

          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.textInputField}
              autoCapitalize={"characters"}
              onChangeText={(value) => setRack(value)}
              value={rack}
              placeholder='Rack' />
            <TouchableOpacity onPress={() => navigation.navigate({
              name: 'Barcode',
              params: { type: "rack" },
              merge: true,
            })}>
              <Ionicons name={"camera"} style={{ fontSize: 30 }} />
            </TouchableOpacity>


          </View>
          <TouchableOpacity style={styles.addButton} onPress={addItemFunction}>
            <View>
              <Text style={styles.addButtonText}>Add item</Text>
            </View>
          </TouchableOpacity>

        </View>

        <View style={styles.bottomContainers}>
          <View style={styles.lastFive}>

            <Text style={styles.lastFiveHeader}>Last 5 added</Text>
            {lastFiveItems.map((data, index) => {
              return (
                <Text key={index} style={styles.lastFiveText}>
                  {data.elguideCode}
                </Text>
              )
            })
            }
          </View>

        </View>
        {filteredData.length != 0 &&
          <View style={[styles.scrollView, styles.shadow]}>
            <ScrollView contentContainerStyle={{ paddingBottom: 12 }}>
              <View>
                {filteredData.slice(0, 10).map((value, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => {
                      setElguide(value.elguide)

                      filteredData.map((data) => {
                        console.log(data)
                        if (value.elguide === data.elguide) {
                          setEan(data.ean)
                        }
                      })
                      setFiltereData([]);
                    }}>
                      <Text style={styles.filteredDataText} >
                        {value.elguide.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        }
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#478bff",
    alignItems: "center",
    height: "100%"
  },
  formBox: {
    alignitem: "center",
    top: 100,
    borderRadius: 5,
    backgroundColor: "white",
    paddingBottom: 20,
    width: 360,
    marginBottom: 150
  },
  textInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 30,
    padding: 10,
    fontSize: 16,
    height: 50,
    width: 300,
    backgroundColor: "#dbdbdb",
    borderRadius: 2
  },
  textInputField: {
    fontSize: 19,
    backgroundColor: "#dbdbdb",
    borderRadius: 2,
    width: "90%",
  },
  header: {
    marginTop: 10,
  },

  addButton: {
    backgroundColor: "#478bff",
    marginTop: 20,
    marginHorizontal: 30,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  addButtonText: {
    fontSize: 25,
    color: "white",

  },
  scrollView: {
    backgroundColor: "#fffffd",
    position: "absolute",
    width: 300,
    top: 260,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  filteredDataText: {
    paddingTop: 5,
    fontSize: 20,
    marginTop: 2,
    marginLeft: 10,
    marginBottom: 5,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bottomContainers: {
    flexDirection: "row",
    width: 360,
    justifyContent: "space-between",
  },
  lastFiveText: {
    padding: 3,
    fontSize: 17
  },
  lastFiveHeader: {
    padding: 3,
    fontSize: 25,
    fontWeight: "bold",
    textDecorationLine: 'underline'
  },
  lastFive: {
    width: 170,
    backgroundColor: "white",
    borderRadius: 5,
    paddingBottom: 10
  }

});
export default AddItem