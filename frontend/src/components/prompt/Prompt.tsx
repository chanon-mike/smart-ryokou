'use client';

import { useState } from 'react';
import InputBar from '@/components/prompt/InputBar';
import PreferencesModal from '@/components/prompt/PreferencesModal';
import type { Recommendation } from '@/types/recommendation';
import { Box, LinearProgress } from '@mui/material';

interface PromptProps {
  transitionToResultCallback: (newRecommendations: Recommendation[], tripTitle: string) => void;
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
