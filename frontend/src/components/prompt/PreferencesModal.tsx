'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  placeInput: string;
  openModal: boolean;
  handleCloseModal: () => void;
};

const PreferencesModal = ({ placeInput, openModal, handleCloseModal }: Props) => {
  const homeT = createTranslation('home');
  const commonT = createTranslation('common');

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>
        {homeT.lang === 'ja'
          ? `${placeInput}${homeT.t('dialog-title')}`
          : `${homeT.t('dialog-title')} ${placeInput}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{homeT.t('dialog-content')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>{commonT.t('cancel')}</Button>
        <Button onClick={handleCloseModal}>{commonT.t('finish')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreferencesModal;
