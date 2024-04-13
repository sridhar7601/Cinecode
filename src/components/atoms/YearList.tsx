// src/components/atoms/YearList.tsx
 
import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import MovieCard from './MovieCard';
 
interface YearListProps {
  year: number;
  movies: {id: number; title: string; genre_ids: string[]; poster_path: string}[];
}
 
const YearList: React.FC<YearListProps> = ({year, movies}) => {
  // console.log(movies,"yearlist");
 
  return (
    <View style={styles.container}>
      <Text style={styles.year}>{year}</Text>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          renderItem={({item}) => (
            <MovieCard
              key={item.id.toString()}
              title={item.title}
              genres={item.genre_ids}
              posterUrl={item.poster_path}
            />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text
          style={{
            alignSelf: 'center',
            color: '#fff',
            fontSize: 20,
            fontWeight: '700',
          }}>
          No movies found
        </Text>
      )}
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  year: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 16,
    color: 'white',
    width: 70,
    // backgroundColor: 'black',
  },
});
 
export default YearList;
 