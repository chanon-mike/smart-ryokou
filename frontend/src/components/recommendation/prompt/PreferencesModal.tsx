'use client';

import type { ApiContext } from '@/client/ApiContext';
import Client from '@/client/Client';
import type { GetResultRequest, GetResultResponse } from '@/client/api/get-result/interface';
import SessionClient from '@/client/service/session/implement';
import { useSnackbar } from '@/components/common/snackbar/SnackbarContext';
import BudgetForm from '@/components/recommendation/prompt/form/BudgetForm';
import DateRangeForm from '@/components/recommendation/prompt/form/DateRangeForm';
import InterestsForm from '@/components/recommendation/prompt/form/InterestsForm';
import PaceForm from '@/components/recommendation/prompt/form/PaceForm';
import PeopleNumberForm from '@/components/recommendation/prompt/form/PeopleNumberForm';
import TripTypeForm from '@/components/recommendation/prompt/form/TripTypeForm';
import { usePreferences } from '@/components/recommendation/prompt/usePreferences';
import { generateObjectId } from '@/libs/helper';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { type Dispatch, type SetStateAction } from 'react';

type PreferencesModalProps = {
  placeInput: string;
  openModal: boolean;
  handleCloseModal: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const PreferencesModal = ({
  placeInput,
  openModal,
  handleCloseModal,
  setIsLoading,
}: PreferencesModalProps) => {
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

  const router = useRouter();

  const homeT = createTranslation('home');
  const commonT = createTranslation('common');
  const ht = homeT.t;
  const ct = commonT.t;

  const formatDate = (date: moment.Moment | null) => {
    if (!date) {
      return '';
    }
    // Moment's month starts from 0
    const month = date.month() + 1;
    const day = date.date();

    return `${month}月${day}日`;
  };

  const buildRequestParams = (): GetResultRequest => {
    return {
      place: placeInput,
      date_from: formatDate(fromDate),
      date_to: formatDate(toDate),
      people_num: peopleNumber,
      budget: selectedBudget.length ? selectedBudget : null,
      trip_pace: selectedPace.length ? selectedPace : null,
      interests: selectedInterests.length ? selectedInterests : null,
      trip_type: selectedTripType.length ? selectedTripType : null,
    };
  };

  const fetchRecommendationData = async (
    apiContext: ApiContext,
    requestParams: GetResultRequest,
  ) => {
    return await Client.getResult(apiContext, requestParams);
  };

  const { openSnackbar } = useSnackbar();

  // Handle fetching recommendation data from server when user submit button
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    handleCloseModal();
    console.log(`handleSubmit run`);
    let serverResponse: GetResultResponse;
    try {
      const requestParams = buildRequestParams();
      serverResponse = await fetchRecommendationData(
        { useMock: false, requireAuth: false },
        requestParams,
      );
    } catch (error) {
      if (error instanceof Error) {
        openSnackbar(error.message, 'warning');
        setIsLoading(false);
      }
      return;
    }
    console.log(`serverResponse after input modal`, serverResponse);

    const sessionClient = new SessionClient();

    const sessionId = await sessionClient.insert({
      _id: generateObjectId(),
      isDeleted: false,
      userId: 'test',
      tripTitle: serverResponse.title,
      recommendations: serverResponse.recommendations,
    });

    if (sessionId) {
      e.preventDefault();
      router.replace(`session?id=${sessionId}`);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>
        <Typography variant="h3">{ht('dialog-title', { name: placeInput })}</Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 0 }}>
          <DialogContentText>
            <Typography variant="body1">{ht('dialog-content')}</Typography>
          </DialogContentText>
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
          <Button variant="contained" type="submit" disabled={!fromDate || !toDate}>
            {ct('finish')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PreferencesModal;
