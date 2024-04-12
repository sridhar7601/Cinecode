// src/components/atoms/MovieCard.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur'; // Import BlurView from react-native-blur

interface MovieCardProps {
  title: string;
  genres: string[];
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, genres, posterUrl }) => {
  return (
    <View style={styles.container}>
      {/* Image with absolute positioning */}
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${posterUrl}` }}  style={styles.poster} resizeMode="cover" />
      {!Platform.OS === 'ios' ? (
        <BlurView style={styles.textContainer} blurType="light" blurAmount={10}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.genres}>{genres.join(', ')}</Text>
        </BlurView>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.genres}>{genres.join(', ')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    margin: 8,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'column', // Flex direction for vertical alignment
  },
  poster: {
    flex: 1, // Take up remaining space within the container
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    },
  textContainer: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    // borderRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  genres: {
    fontSize: 14,
    color: 'white',
  },
});

export default MovieCard;
