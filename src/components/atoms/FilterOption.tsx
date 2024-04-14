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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    marginRight: 8,
    borderRadius: 20,
    height: 54,

    borderWidth: 2,
    borderColor: 'transparent',
  },
  image: {
    width: 100,
    height: 50,
  },

  selectedOption: {
    borderColor: 'teal',
  },
  unselectedOption: {
    backgroundColor: 'transparent',
  },
});

export default FilterOption;
