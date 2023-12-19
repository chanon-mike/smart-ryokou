'use client';

import { Chip } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

type NewLocationExampleChipProps = {
  data: {
    place: string;
    prompt: string;
  };
  setPrompt: Dispatch<SetStateAction<string>>;
};

const NewLocationExampleChip = ({ data, setPrompt }: NewLocationExampleChipProps) => {
  const handleOnClick = () => {
    setPrompt(data.prompt);
  };

  return (
    <Chip label={data.place} onClick={handleOnClick} color="primary" variant="outlined" clickable />
  );
};

export default NewLocationExampleChip;
