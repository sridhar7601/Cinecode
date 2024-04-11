// src/components/atoms/FilterOption.tsx

import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

interface FilterOptionProps {
  label: string;
  isSelected: boolean;
  image: any; // Add this line
  onSelect: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  label,
  image,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.optionContainer,
        isSelected ? styles.selectedOption : styles.unselectedOption,
      ]}
      onPress={onSelect}>
      <Image source={image} style={styles.image} />
      {/* <Text style={styles.optionText}>{label}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    // paddingHorizontal: 6,
    // paddingVertical: 0, //content in inside
    marginRight: 8,
    borderRadius: 20,
    height: 54,
    // borderWidth: 1,
    borderColor: '#007bff',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  image: {
    width: 100, // Adjust as needed
    height: 50, // Adjust as needed
  },
  // optionText: {
  //   color: '#007bff',
  //   fontWeight: 'bold',
  // },
  selectedOption: {
    // backgroundColor: '#e9ecef'
    // color:'black'
    borderColor: 'teal',
  },
  unselectedOption: {
    backgroundColor: 'transparent',
  },
});

export default FilterOption;
