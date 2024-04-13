// App.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomePage from './src/components/pages/HomePage';
import MovieDetailsPage from './src/components/atoms/MovieDetailsPage';
import MainNavigator from './src/navigation/MainNavigator';


const App: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* <MovieDetailsPage /> */}
      {/* <HomePage /> */}
      <MainNavigator/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
