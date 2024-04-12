import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ImageBackground from '../atoms/ImageBackground';
import YearList from '../atoms/YearList';
import FilterOption from '../atoms/FilterOption';


import action from '../../assets/filterlogo/action.png';
import featured from '../../assets/filterlogo/featured.png';
import horror from '../../assets/filterlogo/horror.png';
import scifi from '../../assets/filterlogo/scifi.png';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [moviesByYear, setMoviesByYear] = useState<{ [year: string]: any[] }>({});
  const [visibleYears, setVisibleYears] = useState<number[]>([2012, 2013, 2014]);
  const apiKey = '2dca580c2a14b55200e784d157207b4d';
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const fetchMoviesForYear = async (year: number) => {
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const loadMoreYears = async (direction: 'up' | 'down') => {
    const currentYears = [...visibleYears];
  
    if (direction === 'down') {
      const lastYear = currentYears[currentYears.length - 1];
      const newYear = lastYear + 1;
      const movies = await fetchMoviesForYear(newYear);
      setMoviesByYear((prevMovies) => ({ ...prevMovies, [newYear]: movies }));
      setVisibleYears((prevYears) => [...prevYears, newYear]);
    } else if (direction === 'up') {
      const firstYear = currentYears[0];
      if (firstYear > 2012) {
        const prevYear = firstYear - 1;
        const movies = await fetchMoviesForYear(prevYear);
        setMoviesByYear((prevMovies) => ({ ...prevMovies, [prevYear]: movies }));
        setVisibleYears((prevYears) => [prevYear, ...prevYears]);
      }
    }
  };
  const handleFilterSelect = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((item) => item !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(updatedFilters);
    console.log('Selected Filters:', updatedFilters);
  };

  const handleScroll = ({ nativeEvent }: any) => {
    setLoading(true);

    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const scrollHeight = layoutMeasurement.height + contentOffset.y;
    if (scrollHeight >= contentSize.height - 20) {
      loadMoreYears('down');
// if ()
    } else if (contentOffset.y <= 0) {
      setLoading(true);

      loadMoreYears('up');
    }
  };
  const renderItem = ({item}: {item: any}) => (
    <FilterOption
      label={item.label}
      image={item.image}
      isSelected={selectedFilters.includes(item.label)}
      onSelect={() => handleFilterSelect(item.label)}
    />
  );
  const filterOptions = [
    {label: 'Option 1', image: action},
    {label: 'Option 2', image: scifi},
    {label: 'Option 3', image: horror},
    {label: 'Option 4', image: featured},
    {label: 'Option 5', image: scifi},
    // Add other options...
  ];
  useEffect(() => {
    const fetchInitialMovies = async () => {
      const movieData: { [year: string]: any[] } = {};
      await Promise.all(
        visibleYears.map(async (year) => {
          const movies = await fetchMoviesForYear(year);
          movieData[year] = movies;
        })
      );
      setMoviesByYear(movieData);
    };
    fetchInitialMovies();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={require('../../assets/background.png')}>
        <Text style={styles.title}>Welcome{'\n'}Sridhar</Text>

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
        <ScrollView
          ref={scrollViewRef}
          style={styles.container}
          onScroll={handleScroll}
          scrollEventThrottle={400}
        >
          {visibleYears.map((year) => (
            <YearList key={year} year={year} movies={moviesByYear[year] || []} />
          ))}
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="gray" />
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // Background color behind the safe area (adjust as needed)
  },
  containerfilter: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  browse: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'CarmenSans', // use the exact name of the font file without the extension
    color: 'white',
    marginBottom: 10,
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
