// src/components/atoms/ImageBackground.tsx

import React, {ReactNode,memo} from 'react';
import {ImageBackground, StyleSheet, View, ViewStyle} from 'react-native';
import {BlurView} from '@react-native-community/blur';

interface ImageBackgroundProps {
  source: any; 
  children?: ReactNode; 
  style?: ViewStyle; 
}

const ImageBackgroundComponent: React.FC<ImageBackgroundProps> = ({
  source,
  children,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <ImageBackground source={source} style={styles.imageBackground}>
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ImageBackgroundComponent);
