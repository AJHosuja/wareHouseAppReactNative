import { Modal, StyleSheet, Text, View } from "react-native";
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from "react";


const CustomModal = ({ title, jsonPath, isVisible }) => {
  
  const animation = useRef(null);


  useEffect(() => {
    animation.current?.play();
  },[]);

  return (
    <View style={styles.modalContainer}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.animationContainer}>
            <LottieView  
            source={jsonPath} 
            autoPlay  
            loop={false}
            />
            </View>
            <Text style={styles.textStyle}>{title}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  
  modalView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    top: 750,
    width: "85%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 8,
  },
  
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    marginLeft: 20,
  },

  animationContainer: {
    width: 50, height: 50
  }
});

export default CustomModal;
