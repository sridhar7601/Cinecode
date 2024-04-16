/* eslint-disable react-native/no-inline-styles */
// src/components/atoms/MovieDetailsPage.tsx

import React, {memo, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {genreMapping} from '../utils/genreMapping';

const MovieDetailsPage = ({route}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    title,
    posterUrl,
    vote_average,
    original_language,
    overview,
    genres,
    popularity,
  } = route.params;
  console.log(popularity, vote_average.toFixed(1), 'ffff');

  const langOfMov = original_language.toUpperCase();
  const renderGenres = () => {
    return genres.map(id => {
      const genreName = genreMapping[id] || 'Unknown Genre';
      return (
        <View key={id} style={styles.genreBox}>
          <Text style={styles.genreText}>{genreName}</Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {!imageLoaded ? (
        <ActivityIndicator
          size="large"
          color="gray"
          style={styles.activityIndicator}
        />
      ) : null}
      <Image
        blurRadius={5}
        source={{uri: `https://image.tmdb.org/t/p/w500/${posterUrl}`}}
        style={styles.poster}
      />

      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500/${posterUrl}`}}
        style={styles.innerposter}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
      />
      <View style={styles.detailsarea}>
        <View style={styles.firstrow}>
          <Text style={styles.centeredText}>
            {vote_average.toFixed(1)} / 10 {'\n'}
            Rating
          </Text>
          <Text style={styles.centeredText}>
            {langOfMov}
            {'\n'}
            Lang
          </Text>
          <Text style={styles.centeredText}>
            {popularity} {'\n'}
            Popularity
          </Text>
        </View>
        <View style={styles.titlearea}>
          <Text numberOfLines={2} style={styles.maintitle}>
            {title}
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genresContainer}>
          {renderGenres()}
        </ScrollView>
        <View style={styles.overviewarea}>
          <ScrollView vertical>
            <Text style={styles.overviewcontent} numberOfLines={6}>
              {overview}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    margin: 4,
  },
  maintitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  activityIndicator: {
    justifyContent: 'center',
    position: 'absolute',
    top: 40,
    alignItems: 'center',
  },
  overviewcontent: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  genreText: {
    fontSize: 14,
    color: 'white',
  },
  backgroundwhite: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    bottom: 20,
  },
  centeredText: {
    flex: 1,
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  innerposter: {
    position: 'absolute',
    top: 8,
    borderRadius: 20,

    width: '60%',
    height: '53%',
  },
  titlearea: {
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
    marginTop: 0,
    width: '100%',
    height: '18%',
  },
  firstrow: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  overviewarea: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsarea: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: 270,
    borderRadius: 30,
    borderBottomLeftRadius: 0, // Apply border radius to bottom left corner
    borderBottomRightRadius: 0, // Apply border radius to bottom right corner
    alignItems: 'center',
    padding: 6,
  },
});

export default memo(MovieDetailsPage);
