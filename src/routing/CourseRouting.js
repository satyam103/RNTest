import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import MyCourse from '../screens/myCourse/MyCourse'

const Stack = createNativeStackNavigator()

const CourseRouting = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyCourse" component={MyCourse} />
    </Stack.Navigator>
  )
}

export default CourseRouting
