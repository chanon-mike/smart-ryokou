'use client';

import { useState } from 'react';
import InputBar from '@/components/recommendation/prompt/InputBar';
import PreferencesModal from '@/components/recommendation/prompt/PreferencesModal';
import { Box, Button, LinearProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import createTranslation from 'next-translate/useTranslation';

const Prompt = () => {
  const [openModal, setOpenModal] = useState(false);
  const [placeInput, setPlaceInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ifPlaceInputEmpty = placeInput === '';

  const handleOpenModal = () => {
    if (ifPlaceInputEmpty) {
      return;
    }
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              marginTop: 3,
            }}
          >
            <InputBar placeInput={placeInput} setPlaceInput={setPlaceInput} />
            <InputButton handleOpenModal={handleOpenModal} ifPlaceInputEmpty={ifPlaceInputEmpty} />
          </Box>
          <PreferencesModal
            placeInput={placeInput}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            setIsLoading={setIsLoading}
          />
        </>
      )}
    </>
  );
};

type InputButtonProps = {
  handleOpenModal: () => void;
  ifPlaceInputEmpty: boolean;
};

const InputButton = ({ handleOpenModal, ifPlaceInputEmpty }: InputButtonProps) => {
  const { t } = createTranslation('home');

  return (
    <Box sx={{ display: 'flex' }}>
      <Button
        variant="contained"
        onClick={handleOpenModal}
        color="secondary"
        disabled={ifPlaceInputEmpty}
        disableElevation={true}
        sx={{ height: 40 }}
      >
        {t('input-button')}
        <SendIcon sx={{ marginLeft: 1 }} />
      </Button>
    </Box>
  );
};

export default Prompt;
