import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const BarCode = ({navigation, route}) => {

  const [scanned, setScanned] = useState(false);
  const [scanType, setScanType] = useState("");

  
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
    })()
  }
  
  useEffect(() => {
    if(route.params?.type) {
      if(route.params?.type === "ean") {
        setScanType("ean")
      } else if(route.params?.type === "rack") {
        setScanType("rack")
      }
    }
  },[route.params?.type])
  
  useEffect(() => {
     askForCameraPermission();
   }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    if (scanType === "ean") {
      console.log("here in ean barcode")
      navigation.navigate({
        name: 'AddItem',
        params: { ean: data },
        merge: true,
      });
    } else if (scanType === "rack") {
      console.log("here in rack barcode")
      navigation.navigate({
        name: 'AddItem',
        params: { rack: data },
        merge: true,
      });
    }
  };


  return (
    <View style={styles.container}>
    <View style={styles.barcodebox}>
      <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={{ height: 400, width: 400 }} />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    }
  });

export default BarCode