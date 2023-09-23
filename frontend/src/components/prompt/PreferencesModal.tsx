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

  const lang = homeT.lang;
  const ht = homeT.t;
  const ct = commonT.t;

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>
        {lang === 'ja'
          ? `${placeInput}${ht('dialog-title')}`
          : `${ht('dialog-title')} ${placeInput}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{ht('dialog-content')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>{ct('cancel')}</Button>
        <Button onClick={handleCloseModal}>{ct('finish')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreferencesModal;
