import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddItem from './Componets/AddItem';
import BarCode from './Componets/BarCodeScanner';
import AddItemParent from './Componets/AddItemParent';

const AddItemStack = ({token}) => {

    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator >
        <Stack.Screen 
          name="AddItem"
          options={{headerShown: false}} 
        >
         {(props) => <AddItemParent {...props}/>}
        </Stack.Screen>
      <Stack.Screen 
        name="Barcode"
      >{(props) => <BarCode {...props}/>}</Stack.Screen>
      </Stack.Navigator>
  )
}

export default AddItemStack