'use client';

import { useState } from 'react';
import InputBar from '@/components/prompt/InputBar';
import PreferencesModal from '@/components/prompt/PreferencesModal';

const Prompt = () => {
  const [openModal, setOpenModal] = useState(false);
  const [placeInput, setPlaceInput] = useState('');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
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
      />
    </>
  );
};

export default Prompt;
