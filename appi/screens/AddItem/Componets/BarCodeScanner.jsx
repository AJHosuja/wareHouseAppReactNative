import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType, BarCodeScanningResult, FlashMode } from 'expo-camera';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Touchable } from 'react-native-web';

const BarCode = ({navigation, route}) => {
  const [type, setType] = useState(CameraType.back);
  const [scanned, setScanned] = useState(false);
  const [scanType, setScanType] = useState("");
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  
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
      <Camera type={type} flashMode={flash} 
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={{ height: 400, width: 400 }} 
      />
    </View>
    <TouchableOpacity onPress={() => 
              {setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off);}}>

    <View style={styles.flashcontainer}>
      {flash === Camera.Constants.FlashMode.off ?  
      <Ionicons name={"ios-flashlight"} style={{fontSize: 30}}/>
      :
      <Ionicons name={"ios-flashlight-outline"} style={{fontSize: 30}}/>
      }
    </View>

    </TouchableOpacity>

  </View>
  )
}
/*
<BarCodeScanner
onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
style={{ height: 400, width: 400 }} 
hitSlop={true}
/>
*/

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
    },
    flashcontainer:{
      marginTop: 20,
      backgroundColor: "white",
      height: 100,
      width: 100,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5
    }
  });

export default BarCode