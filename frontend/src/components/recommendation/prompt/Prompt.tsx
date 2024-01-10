'use client';

import SendIcon from '@mui/icons-material/Send';
import { Box, Button, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { parseAsString, useQueryState } from 'next-usequerystate';
import { useState } from 'react';

import InputBar from '@/components/recommendation/prompt/InputBar';
import PreferencesModal from '@/components/recommendation/prompt/PreferencesModal';
import { useScopedI18n } from '@/locales/client';

const Prompt = () => {
  const [placeInput, setPlaceInput] = useQueryState('place', parseAsString.withDefault(''));
  const [openModal, setOpenModal] = useState(false);
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
  const t = useScopedI18n('home');
  const theme = useTheme();
  const isResponsive = useMediaQuery(theme.breakpoints.down('sm'));

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
        {!isResponsive && t('input-button')}
        <SendIcon sx={{ marginLeft: { sm: 1 } }} />
      </Button>
    </Box>
  );
};

export default Prompt;
