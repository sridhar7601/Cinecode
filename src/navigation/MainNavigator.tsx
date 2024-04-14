import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../components/pages/HomePage';
import MovieDetailsPage from '../components/atoms/MovieDetailsPage';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} 
          options={{
            headerShown: false
          }}/>
        <Stack.Screen name="MovieDetailsPage" component={MovieDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}