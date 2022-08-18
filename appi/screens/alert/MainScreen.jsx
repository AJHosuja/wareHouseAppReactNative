import React, { useRef, useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import CustomModal from './CustomModal';

export default function App() {
  const animation = useRef(null);
  const [isVisible, setVisible] = useState(false);
  const customData = require('./assets/success1.json');


  const toggleModal = () => {
    setVisible(true);
    setTimeout( () => {
      setVisible(false);
    }, 3000)
};

  return (
    <View>
      {isVisible &&
    <CustomModal title='Success!' isVisible={isVisible} jsonPath={customData} />
      }
      <View style={styles.buttonContainer}>
        <Button
          title="Restart Animation"
          onPress={toggleModal}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});