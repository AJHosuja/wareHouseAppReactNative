import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchData from './SearchData';
import ItemData from './screens/ItemData';


const SearchDataStack = ({ token }) => {
    const Stack = createNativeStackNavigator();
  return (
    
      <Stack.Navigator >
        <Stack.Screen 
          name="Search"
          options={{headerShown: false}} 
        >
         {(props) => <SearchData {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen 
          name="ItemData"
          children={ItemData}
        />
      </Stack.Navigator>
    
  )
}

export default SearchDataStack