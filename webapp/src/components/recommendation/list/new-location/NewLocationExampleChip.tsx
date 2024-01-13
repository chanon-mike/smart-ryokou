'use client';

import { Chip } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

type NewLocationExampleChipProps = {
  data: {
    place: string;
    prompt: string;
  };
  setPrompt: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
};

const NewLocationExampleChip = ({ data, setPrompt, isLoading }: NewLocationExampleChipProps) => {
  const handleOnClick = () => {
    setPrompt(data.prompt);
  };

  return (
    <Chip
      label={data.place}
      onClick={handleOnClick}
      color="primary"
      variant="outlined"
      clickable
      disabled={isLoading}
    />
  );
};

export default NewLocationExampleChip;
