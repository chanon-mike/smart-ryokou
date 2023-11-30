'use client';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  placeInput: string;
  setPlaceInput: Dispatch<SetStateAction<string>>;
  handleOpenModal: () => void;
};
// ... (other imports)

const InputBar = ({ placeInput, setPlaceInput, handleOpenModal }: Props) => {
  const { t } = useTranslation('home');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOpenModal();
  };

  const handleSearchIconClick = () => {
    if (placeInput.trim() !== '') {
      handleOpenModal();
    }
  };

  return (
    <form
      style={{
        padding: 20,
        width: '600px',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        required
        id="search"
        placeholder={t('input-message')}
        value={placeInput}
        onChange={handleChange}
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AutoAwesomeIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ cursor: placeInput.trim() !== '' ? 'pointer' : 'default' }}
            >
              <SearchIcon onClick={handleSearchIconClick} color="secondary" />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default InputBar;
