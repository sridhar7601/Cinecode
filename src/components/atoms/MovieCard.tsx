// src/components/atoms/MovieCard.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

interface MovieCardProps {
  title: string;
  genres: string[];
  posterUrl: string;
  overview: string;
  vote_average: number;
  release_date: string;
  original_language: string;
  popularity: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, genres, posterUrl, overview, vote_average, release_date, original_language, popularity }) => {
  const navigation = useNavigation();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePress = () => {
    navigation.navigate('MovieDetailsPage', {
      title,
      genres,
      posterUrl,
      overview,
      vote_average,
      release_date,
      original_language,
      popularity
    });
  };

  const loadImage = () => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = `https://image.tmdb.org/t/p/w500/${posterUrl}`;
      image.onload = () => {
        setImageLoaded(true);
        resolve();
      };
      image.onerror = (error) => {
        console.error('Error loading image:', error);
        reject();
      };
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {!imageLoaded ? (
        <ActivityIndicator size="large" color="gray" style={styles.activityIndicator} />
      ) : null}
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${posterUrl}` }}
        style={styles.poster}
        resizeMode="cover"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
      />
      {Platform.OS === 'ios' ? (
        <BlurView style={styles.textContainer} blurType="light" blurAmount={10}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </BlurView>
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    margin: 8,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'column',
    position: 'relative', // Ensure activity indicator is positioned correctly
  },
  poster: {
    flex: 1,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    padding: 12,
    position: 'absolute',
    bottom: 0,
    height: '35%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default MovieCard;
