// src/components/atoms/FilterOption.tsx

import React, {memo} from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

interface FilterOptionProps {
  isSelected: boolean;
  image: any;
  onSelect: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
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

export default memo(FilterOption);
