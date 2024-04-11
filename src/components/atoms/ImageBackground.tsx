import React, {ReactNode} from 'react';
import {ImageBackground, StyleSheet, View, ViewStyle} from 'react-native';
import {BlurView} from '@react-native-community/blur';

interface ImageBackgroundProps {
  source: any; // Image source
  children?: ReactNode; // Child components
  style?: ViewStyle; // Additional styles
}

const ImageBackgroundComponent: React.FC<ImageBackgroundProps> = ({
  source,
  children,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <ImageBackground source={source} style={styles.imageBackground}>
        {/* <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={20} /> */}
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderTopLeftRadius:20,
    // borderTopRightRadius:20,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageBackgroundComponent;
