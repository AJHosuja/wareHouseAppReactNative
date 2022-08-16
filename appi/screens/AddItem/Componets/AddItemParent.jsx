import { View, Text } from 'react-native'
import React from 'react'
import AddItem from './AddItem'

const AddItemParent = (props) => {
    

  return (
    <View>
      <AddItem {...props} />
    </View>
  )
}

export default AddItemParent