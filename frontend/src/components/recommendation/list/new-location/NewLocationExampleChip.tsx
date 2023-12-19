'use client';

import { Chip } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

type NewLocationExampleChipProps = {
  data: string;
  setPrompt: Dispatch<SetStateAction<string>>;
};

const NewLocationExampleChip = ({ data, setPrompt }: NewLocationExampleChipProps) => {
  const handleOnClick = () => {
    setPrompt(data);
  };

  return <Chip label={data} onClick={handleOnClick} color="primary" variant="outlined" clickable />;
};

export default NewLocationExampleChip;
