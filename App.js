// App.js
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from './src/navigation/AppNavigator';
import { DataContextProvider } from './src/context/DataContext';

export default function App() {
  return (
    <NavigationContainer>
      <DataContextProvider>
        <AppNavigator />
      </DataContextProvider>
    </NavigationContainer>
  );
}
