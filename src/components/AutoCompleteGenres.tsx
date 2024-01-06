import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { TextField, Autocomplete, Chip } from '@mui/material';
import { GenreType } from '../types/genre';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateFilter } from '../redux/slices/filterSlice';
import { API_URL } from '../config/api';

const AutoCompleteGenres = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);

  const [inputValue, setInputValue] = useState('');
  const [genres, setGenres] = useState<GenreType[]>([]);

  const fetchGenres = async (title: string | null) => {
    await axios.get(`${API_URL}/genres/?title=${title ? title : ''}&limit=5`).then((response) => {
      const data = response.data.data.genres;
      setGenres(data);
    });
  };

  const handleValueOnChange = (_event: SyntheticEvent<Element, Event>, newValue: string | null) => {
    if (!newValue) {
      setGenres([]);
      dispatch(updateFilter({ ...filter, genre: { title: '', genreId: '' } }));
      return;
    }
    const genreID = genres.filter((genre) => genre.title === newValue);
    dispatch(updateFilter({ ...filter, genre: { title: genreID[0].title, genreId: genreID[0]._id } }));
  };

  const handleInpuOnChange = (_event: SyntheticEvent<Element, Event>, newInputValue: string) => {
    if (newInputValue.length === 0) {
      setInputValue(newInputValue);
      setGenres([]);
      return;
    }
    setInputValue(newInputValue);
    fetchGenres(newInputValue);
  };

  return (
    <Autocomplete
      fullWidth
      value={filter.genre.title.length === 0 ? null : filter.genre.title}
      onChange={handleValueOnChange}
      inputValue={inputValue}
      onInputChange={handleInpuOnChange}
      options={genres.map((ele) => ele.title)}
      renderTags={(value: string[], getTagProps) => (
        <div style={{ width: '100%' }}>
          {value.map((option: string, index: number) => (
            <Chip variant='outlined' label={option} {...getTagProps({ index })} />
          ))}
        </div>
      )}
      renderInput={(params) => <TextField {...params} label='Genres' placeholder='Please type something' />}
    />
  );
};

export default AutoCompleteGenres;
