// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListView from '../screens/ListView';
import DetailScreen from '../screens/DetailScreen';

//routes
const Stack = createNativeStackNavigator();


const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ListView">
      <Stack.Screen name="ListView" component={ListView} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
