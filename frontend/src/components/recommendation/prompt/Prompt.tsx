'use client';

import { useState } from 'react';
import InputBar from '@/components/recommendation/prompt/InputBar';
import PreferencesModal from '@/components/recommendation/prompt/PreferencesModal';
import { Box, LinearProgress } from '@mui/material';

interface PromptProps {
  transitionToResultCallback: () => void;
}

const Prompt: React.FC<PromptProps> = ({ transitionToResultCallback }) => {
  const [openModal, setOpenModal] = useState(false);
  const [placeInput, setPlaceInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: '100%', marginTop: 3 }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <InputBar
            placeInput={placeInput}
            setPlaceInput={setPlaceInput}
            handleOpenModal={handleOpenModal}
          />
          <PreferencesModal
            placeInput={placeInput}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            transitionToResultCallback={transitionToResultCallback}
            setIsLoading={setIsLoading}
          />
        </>
      )}
    </>
  );
};

export default Prompt;
