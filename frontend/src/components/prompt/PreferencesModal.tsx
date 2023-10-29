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
import PeopleNumberForm from '@/components/prompt/form/PeopleNumberForm';
import PaceForm from '@/components/prompt/form/PaceForm';
import BudgetForm from '@/components/prompt/form/BudgetForm';
import InterestsForm from '@/components/prompt/form/InterestsForm';
import createTranslation from 'next-translate/useTranslation';
import type { Recommendation } from '@/types/recommendation';
import Client from '@/client/Client';
import type { ApiContext } from '@/client/ApiContext';
import type { GetResultRequest, GetResultResponse } from '@/client/api/GetResult/interface';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
  placeInput: string;
  openModal: boolean;
  handleCloseModal: () => void;
  transitionToResultCallback: (newRecommendations: Recommendation[], tripTitle: string) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const PreferencesModal = ({
  placeInput,
  openModal,
  handleCloseModal,
  transitionToResultCallback,
  setIsLoading,
}: Props) => {
  const {
    fromDate,
    handleFromDateChange,
    toDate,
    handleToDateChange,
    peopleNumber,
    handlePeopleNumberChange,
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

  const ht = homeT.t;
  const ct = commonT.t;

  // eslint-disable-next-line complexity
  const handleSubmit = async () => {
    setIsLoading(true);
    handleCloseModal();
    let serverResponse: GetResultResponse;
    const fromDateMonth = fromDate?.month(); // NOTE: Moment's month starts from 0
    const fromDateDay = fromDate?.date();
    const toDateMonth = toDate?.month(); // NOTE: Moment's month starts from 0
    const toDateDay = toDate?.date();
    try {
      serverResponse = await Client.getResult(
        { useMock: false, requireAuth: false } as ApiContext,
        {
          place: placeInput,
          date_from: fromDateMonth ? `${fromDateMonth + 1}月${fromDateDay}日` : '',
          date_to: toDateMonth ? `${toDateMonth + 1}月${toDateDay}日` : '',
          people_num: peopleNumber,
          budget: selectedBudget.length ? selectedBudget : null,
          trip_pace: selectedPace.length ? selectedPace : null,
          interests: selectedInterests.length ? selectedInterests : null,
          trip_type: selectedTripType.length ? selectedTripType : null,
        } as GetResultRequest,
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      return;
    } finally {
      setIsLoading(false);
    }
    transitionToResultCallback(serverResponse.recommendations, serverResponse.title);
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>{ht('dialog-title', { name: placeInput })}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DialogContentText>{ht('dialog-content')}</DialogContentText>
          <DateRangeForm
            fromDate={fromDate}
            handleFromDateChange={handleFromDateChange}
            toDate={toDate}
            handleToDateChange={handleToDateChange}
          />
          <PeopleNumberForm
            peopleNumber={peopleNumber}
            handlePeopleNumberChange={handlePeopleNumberChange}
          />
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
        <DialogActions sx={{ margin: 3 }}>
          <Button onClick={handleCloseModal}>{ct('cancel')}</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            type="submit"
            disabled={!fromDate || !toDate}
          >
            {ct('finish')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PreferencesModal;
