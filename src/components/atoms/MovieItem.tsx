// src/components/atoms/MovieItem.tsx

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface MovieItemProps {
  title: string;
  posterPath: string;
  releaseDate: string;
}

const MovieItem: React.FC<MovieItemProps> = ({ title, posterPath, releaseDate }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${posterPath}` }} style={styles.poster} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.releaseDate}>{releaseDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});

export default MovieItem;
