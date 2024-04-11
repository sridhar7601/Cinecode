// src/components/pages/HomePage.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList,ScrollView } from 'react-native';
import ImageBackground from '../atoms/ImageBackground';
import YearList from '../atoms/YearList';
import axios from 'axios'; // Import axios for making HTTP requests
import FilterOption from '../atoms/FilterOption';
import BodyCardMain from '../atoms/BodyCardMain';
import action from '../../assets/filterlogo/action.png';
import featured from '../../assets/filterlogo/featured.png';
import horror from '../../assets/filterlogo/horror.png';
import scifi from '../../assets/filterlogo/scifi.png';

const HomePage: React.FC = () => {
  const [moviesByYear, setMoviesByYear] = useState<{ [year: string]: any[] }>({});
  const apiKey = '2dca580c2a14b55200e784d157207b4d';

  useEffect(() => {
    const fetchMoviesByYear = async () => {
      const years = [2020, 2021, 2022, 2023, 2024]; // Specify the years to fetch movies for

      const movieDataPromises = years.map(async (year) => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
        const response = await axios.get(url);
        return { year: String(year), movies: response.data.results };
      });

      // Wait for all movie data promises to resolve
      const movieDataResults = await Promise.all(movieDataPromises);
      const moviesByYearObject: { [year: string]: any[] } = {};
      
      movieDataResults.forEach((result) => {
        moviesByYearObject[result.year] = result.movies;
        // console.log(movieDataResults,"moviesbyyear");

      });

      setMoviesByYear(moviesByYearObject);
    };

    fetchMoviesByYear();
  }, []); // Run this effect only once on component mount

  // section fr filter
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterSelect = (filter: string) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(item => item !== filter)
      : [...selectedFilters, filter];
    setSelectedFilters(updatedFilters);
    // console.log('Selected Filters:', updatedFilters);
  };

  const filterOptions = [
    {label: 'Option 1', image: action},
    {label: 'Option 2', image: scifi},
    {label: 'Option 3', image: horror},
    {label: 'Option 4', image: featured},
    {label: 'Option 5', image: scifi},
    // Add other options...
  ];

  const renderItem = ({ item }: { item: any }) => (
    <FilterOption
      label={item.label}
      image={item.image}
      isSelected={selectedFilters.includes(item.label)}
      onSelect={() => handleFilterSelect(item.label)}
    />
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={require('../../assets/background.png')}>
        <ScrollView style={styles.container}>
        <Text style={styles.title}>Welcome{'\n'}Sridhar</Text>
        <Text style={styles.browse}>Browse By</Text>

        <View style={styles.containerfilter}>
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filterOptions}
            renderItem={renderItem}
            keyExtractor={(item) => item.label}
          />
        </View>
          {Object.entries(moviesByYear).map(([year, movies]) => (
            <YearList key={year} year={parseInt(year)} movies={movies} />
          ))}
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
  containermain: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerfilter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal:10
    margin:2,
  },
  browse: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'CarmenSans', // use the exact name of the font file without the extension
    color: 'white',
    marginBottom: 10,
    marginLeft: 10,
    alignSelf: 'flex-start', // Aligns the text to the start (left for LTR layouts)
    // marginTop: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    fontFamily: 'CarmenSans', // use the exact name of the font file without the extension
    color: 'white',
    marginBottom: 16,
    marginLeft: 10,
    alignSelf: 'flex-start', // Aligns the text to the start (left for LTR layouts)
    marginTop: 16, // Adds some margin at the top (adjust as needed)
  },
});

export default HomePage;
