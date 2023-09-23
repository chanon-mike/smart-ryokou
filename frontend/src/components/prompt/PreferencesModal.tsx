'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { usePreferences } from '@/hooks/usePreferences';
import TripTypeForm from '@/components/prompt/form/TripTypeForm';
import DateRangeForm from '@/components/prompt/form/DateRangeForm';
import PaceForm from '@/components/prompt/form/PaceForm';
import BudgetForm from '@/components/prompt/form/BudgetForm';
import InterestsForm from '@/components/prompt/form/InterestsForm';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  placeInput: string;
  openModal: boolean;
  handleCloseModal: () => void;
};

const PreferencesModal = ({ placeInput, openModal, handleCloseModal }: Props) => {
  const {
    selectedTripType,
    handleSelectTripType,
    selectedPace,
    handleSelectPace,
    selectedBudget,
    handleSelectBudget,
    selectedInterests,
    handleSelectInterest,
  } = usePreferences();

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
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <DialogContentText>{ht('dialog-content')}</DialogContentText>
        <DateRangeForm />
        <TripTypeForm
          selectedTripTypes={selectedTripType}
          handleSelectTripType={handleSelectTripType}
        />
        <PaceForm selectedPace={selectedPace} handleSelectPace={handleSelectPace} />
        <BudgetForm selectedBudget={selectedBudget} handleSelectBudget={handleSelectBudget} />
        <InterestsForm
          selectedInterests={selectedInterests}
          handleSelectInterest={handleSelectInterest}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>{ct('cancel')}</Button>
        <Button onClick={handleCloseModal}>{ct('finish')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreferencesModal;
