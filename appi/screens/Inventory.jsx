import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../features/userSlice";
import { useState } from 'react';

const Inventory = () => {
  const items = useSelector(selectToken)
  const [item, setItem] = useState(items);

  console.log(items)
  useEffect(() => {
  })
  return (
    <View>
      <Text>{item}</Text>
    </View>
  )
}

export default Inventory