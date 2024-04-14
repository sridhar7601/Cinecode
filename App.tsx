// App.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';


const App: React.FC = () => {
  return (
    <View style={styles.container}>
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
