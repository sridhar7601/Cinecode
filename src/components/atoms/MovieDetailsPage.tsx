import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import whiteBackground from '../../assets/blur-background.png';
import { genreMapping } from '../utils/genreMapping';

const MovieDetailsPage = ({route}) => {
  // Extract the parameters from the route
  const {title, posterUrl, vote_average,original_language, overview,genres,popularity} = route.params;
  const langOfMov = original_language.toUpperCase();
  console.log(genres, 'genre');
  const renderGenres = () => {
    return genres.map((id) => {
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
      <Image
        blurRadius={Platform.OS === 'ios' ? 10 : 3}
        source={{uri: `https://image.tmdb.org/t/p/w500/${posterUrl}`}}
        style={styles.poster}
      />

      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500/${posterUrl}`}}
        style={styles.innerposter}
      />
      {/* <Image  blurRadius={15 } source={whiteBackground} style={styles.backgroundwhite} /> */}

      <View style={styles.detailsarea}>
        <View style={styles.firstrow}>
        <Text style={styles.centeredText}>
            {vote_average}/ 10 {'\n'}
            Rating
          </Text>
          <Text style={styles.centeredText}>
          {langOfMov}{'\n'}
          Lang
          </Text>
          <Text style={styles.centeredText}>
          {popularity} {'\n'}
          Popularity
          </Text>
        </View>
        <View style={styles.titlearea}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {title}
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genresContainer}
        >
          {renderGenres()}
        </ScrollView>
        <View style={styles.overviewarea}>
          <Text style={{textAlign: 'center'}} numberOfLines={6}>
            {overview}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }, genreBox: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    margin: 4,
  },
  genreText: {
    fontSize: 14,
    color: '#333',
  },
  backgroundwhite: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    bottom: 20,
  }, centeredText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  poster: {
    width: '120%',
    height: '100%',
    // borderRadius: 10,
    // marginBottom: 20,
  },
  genresContainer: {
    flexDirection: 'row', // Ensure genres are laid out horizontally
    flexWrap: 'wrap',      // Allow genres to wrap to the next line
    justifyContent: 'center', // Center genres horizontally within the container
    alignItems: 'center',      // Align genres vertically within the container
    marginBottom: 12,
  },
  innerposter: {
    position: 'absolute',
    top: 8,
    borderRadius: 20,

    width: '60%',
    // backgroundColor: 'red',
    height: '53%',
  },
  titlearea: {
    // backgroundColor: 'black',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-around',
    textAlign: 'center',
    margin: 5,
    width: '100%',
    height: '20%',
  },
  firstrow: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',

    // backgroundColor: 'black',
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // alignItems: 'center'
  },
  overviewarea: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent:'center',
    width: '100%',
    // backgroundColor: 'orange',
    height: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsarea: {
    backgroundColor: '#eee',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    height: 270,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    padding: 5,
  },
});

export default MovieDetailsPage;
