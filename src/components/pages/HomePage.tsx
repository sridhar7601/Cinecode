// src/components/pages/HomePage.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TextInput,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import ImageBackground from '../atoms/ImageBackground';
// import {API_KEY} from 'react-native-dotenv';
import YearList from '../atoms/YearList';
import FilterOption from '../atoms/FilterOption';
import action from '../../assets/filterlogo/action.png';
import horror from '../../assets/filterlogo/horror.png';
import scifi from '../../assets/filterlogo/scifi.png';
import adventure from '../../assets/filterlogo/adventure.png';
import comedy from '../../assets/filterlogo/comedy.png';
import crime from '../../assets/filterlogo/crime.png';
import romance from '../../assets/filterlogo/romance.png';
import thriller from '../../assets/filterlogo/thriller.png';
import war from '../../assets/filterlogo/war.png';

import axios from 'axios';

const HomePage: React.FC = () => {
  const [isConnected, setConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      setConnected(state.isConnected);
    });
    return () => {
      // Unsubscribe
      unsubscribe();
    };
  }, []);
  const [moviesByYear, setMoviesByYear] = useState<{[year: string]: any[]}>({});
  const [visibleYears, setVisibleYears] = useState<number[]>([2012]);
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const apiKey = '2dca580c2a14b55200e784d157207b4d';
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const fetchMoviesForYear = async (year: number, filters: string[]) => {
    setLoading(true);

    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
      if (filters.length > 0) {
        const genresParam = filters.join(',');
        url += `&with_genres=${genresParam}`;
      }
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadMoreYears = async () => {
    let lastYear;
    setVisibleYears(prevYears => {
      lastYear = prevYears[prevYears.length - 1];
      return [...prevYears, lastYear + 1];
    });
    const movies = await fetchMoviesForYear(lastYear + 1, selectedFilters);
    setMoviesByYear(prevMovies => ({...prevMovies, [lastYear + 1]: movies}));
  };
  const handleInputChange = (text: string) => {
    setInputValue(text); // Update the state with the new input value
  };
  const handleFilterSelect = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(item => item !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(updatedFilters);
  };

  async function onRefresh() {
    setRefreshing(true);
    if (visibleYears.length > 0) {
      let lastYear = visibleYears[0];

      setVisibleYears(prevYears => [lastYear - 1, ...prevYears]);

      const movies = await fetchMoviesForYear(lastYear - 1, selectedFilters);

      setMoviesByYear(prevMovies => ({[lastYear - 1]: movies, ...prevMovies}));
    }

    setRefreshing(false);
  }

  const renderItem = ({item}: {item: any}) => (
    <FilterOption
      label={item.label}
      image={item.image}
      isSelected={selectedFilters.includes(item.label)}
      onSelect={() => handleFilterSelect(item.label)}
    />
  );
  const filterOptions = [
    {label: '28', image: action},
    {label: '878', image: scifi},
    {label: '27', image: horror},
    {label: '99', image: adventure},
    {label: '98', image: scifi},
    {label: '35', image: comedy},
    {label: '80', image: crime},
    {label: '10749', image: romance},
    {label: '53', image: thriller},
    {label: '10752', image: war},
  ];
  useEffect(() => {
    setLoading(true);
    const fetchInitialMovies = async () => {
      const movieData: {[year: string]: any[]} = {};
      await Promise.all(
        visibleYears.map(async year => {
          const movies = await fetchMoviesForYear(year, selectedFilters);
          let filteredMovies = movies.filter(movie => {
            const movieTitle = movie.title.toLowerCase(); // Convert movie title to lowercase

            return movieTitle.includes(inputValue.toLowerCase());
          });

          movieData[year] = filteredMovies;
        }),
      );
      setMoviesByYear(movieData);
    };
    fetchInitialMovies();
    setLoading(false);
  }, [visibleYears, selectedFilters, inputValue]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {isConnected ? (
        <ImageBackground source={require('../../assets/background.png')}>
          <Text style={styles.title}>Cinecode</Text>

          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={handleInputChange}
            placeholder="Search movies..."
            placeholderTextColor="#999"
          />
          <Text style={styles.browse}>Browse By</Text>

          <View style={styles.containerfilter}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filterOptions}
              renderItem={renderItem}
              keyExtractor={item => item.label}
            />
          </View>
          <FlatList
            style={styles.container}
            data={visibleYears}
            renderItem={({item}) => {
              return item <= 2024 ? (
                <YearList year={item} movies={moviesByYear[item] || []} />
              ) : null;
            }}
            keyExtractor={item => item.toString()}
            onRefresh={onRefresh}
            refreshing={refreshing}
            showsHorizontalScrollIndicator={false}
            onEndReached={() => loadMoreYears()}
            ListFooterComponent={
              loading ? <ActivityIndicator size="large" color="gray" /> : null
            }
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </ImageBackground>
      ) : (
        <ImageBackground
          source={require('../../assets/no-internet.jpeg')}
          style={styles.nointernet}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    // flexDirection: 'column',
    // flexWrap: 'wrap',
  },
  nointernet: {
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light transparent background
    paddingHorizontal: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    width: '95%',
    borderRadius: 20,
    color: 'white',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerfilter: {
    flex: 0.16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  browse: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'CarmenSans',

    color: 'white',
    marginBottom: 5,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    fontFamily: 'CarmenSans',
    color: 'white',
    marginBottom: 16,
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomePage;
