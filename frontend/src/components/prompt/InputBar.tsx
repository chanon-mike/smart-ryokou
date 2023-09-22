'use client';

import { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useTranslation from 'next-translate/useTranslation';

const InputBar = () => {
  const [input, setInput] = useState('');
  const { t } = useTranslation('home');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <form
      style={{
        padding: 20,
        width: '600px',
      }}
    >
      <TextField
        fullWidth
        id="search"
        type="search"
        placeholder={t('input-message')}
        value={input}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default InputBar;
