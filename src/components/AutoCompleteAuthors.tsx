import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { TextField, Autocomplete, Chip } from '@mui/material';
import { AuthorType } from '../types/author';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateFilter } from '../redux/slices/filterSlice';

const AutoCompleteAuthors = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter);

  const [inputValue, setInputValue] = useState('');
  const [authors, setAuthors] = useState<AuthorType[]>([]);

  const fetchGenres = async (name: string | null) => {
    await axios
      .get(`https://cqtri-library.onrender.com/api/v1/authors/?name=${name ? name : ''}&limit=5`)
      .then((response) => {
        const data = response.data.data.authors;
        setAuthors(data);
      });
  };

  const handleValueOnChange = (_event: SyntheticEvent<Element, Event>, newValue: string | null) => {
    if (!newValue) {
      setAuthors([]);
      dispatch(updateFilter({ ...filter, author: { name: '', authorId: '' } }));
      return;
    }
    const authorID = authors.filter((author) => author.name === newValue);
    dispatch(updateFilter({ ...filter, author: { name: authorID[0].name, authorId: authorID[0]._id } }));
  };

  const handleInpuOnChange = (_event: SyntheticEvent<Element, Event>, newInputValue: string) => {
    if (newInputValue.length === 0) {
      setInputValue(newInputValue);
      setAuthors([]);
      return;
    }
    setInputValue(newInputValue);
    fetchGenres(newInputValue);
  };

  return (
    <Autocomplete
      fullWidth
      value={filter.author.name.length === 0 ? null : filter.author.name}
      onChange={handleValueOnChange}
      inputValue={inputValue}
      onInputChange={handleInpuOnChange}
      options={authors.map((ele) => ele.name)}
      renderTags={(value: string[], getTagProps) => (
        <div style={{ width: '100%' }}>
          {value.map((option: string, index: number) => (
            <Chip variant='outlined' label={option} {...getTagProps({ index })} />
          ))}
        </div>
      )}
      renderInput={(params) => <TextField {...params} label='Authors' placeholder='Please type something' />}
    />
  );
};

export default AutoCompleteAuthors;
