import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import HomePage from './HomePage';

jest.mock('axios');

describe('HomePage', () => {
  it('should render the component', () => {
    const { toJSON } = render(<HomePage />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should fetch and display movies by year', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', release_date: '2012-01-01' },
      { id: 2, title: 'Movie 2', release_date: '2013-02-01' },
      { id: 3, title: 'Movie 3', release_date: '2014-03-01' },
    ];

    axios.get.mockResolvedValueOnce({ data: { results: mockMovies } });

    const { getByText } = render(<HomePage />);

    await waitFor(() => {
      expect(getByText('2012')).toBeDefined();
      expect(getByText('2013')).toBeDefined();
      expect(getByText('2014')).toBeDefined();
    });
  });

  it('should filter movies by selected genres', async () => {
    const mockMovies = [
      { id: 1, title: 'Action Movie', genre_ids: [28] },
      { id: 2, title: 'Sci-Fi Movie', genre_ids: [12] },
      { id: 3, title: 'Horror Movie', genre_ids: [16] },
    ];

    axios.get.mockResolvedValueOnce({ data: { results: mockMovies } });

    const { getByLabelText, getByText } = render(<HomePage />);

    fireEvent.press(getByLabelText('28'));
    fireEvent.press(getByLabelText('12'));

    await waitFor(() => {
      expect(getByText('Action Movie')).toBeDefined();
      expect(getByText('Sci-Fi Movie')).toBeDefined();
      expect(() => getByText('Horror Movie')).toThrow();
    });
  });
});