// src/components/pages/HomePage.tsx

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView,FlatList, SafeAreaView} from 'react-native';
import ImageBackground from '../atoms/ImageBackground';
import FilterOption from '../atoms/FilterOption';
import BodyCardMain from '../atoms/BodyCardMain';
import action from '../../assets/filterlogo/action.png';
import featured from '../../assets/filterlogo/featured.png';
import horror from '../../assets/filterlogo/horror.png';
import scifi from '../../assets/filterlogo/scifi.png';

const HomePage: React.FC = () => {
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
      <ScrollView style={{flex:1, width:'100%',height:'100%', flexGrow:1}}>

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
        </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
