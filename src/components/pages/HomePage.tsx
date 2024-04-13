import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl
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
  const [refreshing,setRefreshing] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const fetchMoviesForYear = async (year: number, filters: string[]) => {
    setLoading(true);
    console.log(filters,"filters")
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
      // Add filters to the API request
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
  

  const loadMoreYears = async (direction: 'up' | 'down') => {
    var lastYear;
    setVisibleYears((prevYears) =>{
      lastYear = prevYears[prevYears.length - 1];
      return ([
        ...prevYears,lastYear+1
      ])
    });
    const movies = await fetchMoviesForYear(lastYear+1, selectedFilters);
    setMoviesByYear((prevMovies) => ({ ...prevMovies, [lastYear+1]: movies }));
  };
  
  const handleFilterSelect = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((item) => item !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(updatedFilters);
    console.log('Selected Filters:', updatedFilters);
  };

  async function onRefresh(){
    setRefreshing(true);
    //fetch data
    var lastYear;
     setVisibleYears((prevYears) =>{
      lastYear = prevYears[0];
      return ([
        lastYear-1,...prevYears
      ])
    });
      const movies = await fetchMoviesForYear(lastYear-1);
      setMoviesByYear((prevMovies) => ({[lastYear-1]: movies, ...prevMovies }));
    setRefreshing(false);
  }

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
    {label: '28', image: action},
    {label: '12', image: scifi},
    {label: '16', image: horror},
    {label: '35', image: featured},
    {label: '99', image: scifi},
    // Add other options...
  ];
  useEffect(() => {
    const fetchInitialMovies = async () => {

      const movieData: { [year: string]: any[] } = {};
      await Promise.all(
        visibleYears.map(async (year) => {
          const movies = await fetchMoviesForYear(year, selectedFilters);
          movieData[year] = movies;
        })
      );
      setMoviesByYear(movieData);
      
    };
    fetchInitialMovies();
    setLoading(false);

  }, [visibleYears, selectedFilters]); // Include selectedFilters as a dependency
  

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
        <FlatList
  style={styles.container}
  data={visibleYears}
  renderItem={({ item }) => 
    <YearList year={item} movies={moviesByYear[item] || []} />}
  keyExtractor={(item) => item.toString()}
  onRefresh={onRefresh}
  refreshing={refreshing}
  onEndReached={() => loadMoreYears('down') }
  ListFooterComponent={loading? <ActivityIndicator size="large" color="gray" />: null}
  onEndReachedThreshold={0.1}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>

      </ImageBackground>
    </SafeAreaView>
  );
}

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
