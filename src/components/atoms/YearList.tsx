/* eslint-disable react-native/no-inline-styles */
// src/components/atoms/YearList.tsx

import React, {memo} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import MovieCard from './MovieCard';

interface YearListProps {
  year: number;
  movies: {
    vote_count: number;
    overview: string;
    id: number;
    title: string;
    genre_ids: string[];
    poster_path: string;
    overView: string[];
    vote_average: number;
    release_date: string;
    original_language: string;
  }[];
}

const YearList: React.FC<YearListProps> = ({year, movies}) => {
  return (
    <View style={styles.container}>
      {movies.length > 0 ? (
        <>
          <Text style={styles.year}>{year}</Text>
          <FlatList
            data={movies}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <MovieCard
                key={item.id.toString()}
                title={item.title}
                genres={item.genre_ids}
                posterUrl={item.poster_path}
                overview={item.overview}
                vote_average={item.vote_average}
                release_date={item.release_date}
                original_language={item.original_language}
                popularity={item.vote_count}
              />
            )}
            keyExtractor={item => item.id.toString()}
            horizontal
          />
        </>
      ) : null}
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
  },
});

export default memo(YearList);
