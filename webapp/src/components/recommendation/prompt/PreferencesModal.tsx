'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { type Dispatch, type SetStateAction } from 'react';

import type {
  GetRecommendationRequest,
  GetRecommendationResponse,
} from '@/client/api/llm/recommendation/interface';
import type { ApiContext } from '@/client/apiContext';
import client from '@/client/client';
import SessionClient from '@/client/service/session/implement';
import { useSnackbar } from '@/components/common/snackbar/SnackbarContext';
import BudgetForm from '@/components/recommendation/prompt/form/BudgetForm';
import DateRangeForm from '@/components/recommendation/prompt/form/DateRangeForm';
import InterestsForm from '@/components/recommendation/prompt/form/InterestsForm';
import OptionalPrompt from '@/components/recommendation/prompt/form/OptionalPrompt';
import PaceForm from '@/components/recommendation/prompt/form/PaceForm';
import TripTypeForm from '@/components/recommendation/prompt/form/TripTypeForm';
import { usePreferences } from '@/components/recommendation/prompt/usePreferences';
import { generateObjectId } from '@/libs/helper';
import { useScopedI18n } from '@/locales/client';

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
    // peopleNumber,
    // handlePeopleNumberChange,
    selectedTripType,
    handleSelectTripType,
    selectedPace,
    handleSelectPace,
    selectedBudget,
    handleSelectBudget,
    selectedInterests,
    handleSelectInterest,
    inputtedOptionalPrompt,
    handleChangeInputtedOptionalPrompt,
  } = usePreferences();

  const router = useRouter();

  const ht = useScopedI18n('home');
  const ct = useScopedI18n('common');

  const formatDate = (date: moment.Moment | null) => {
    if (!date) {
      return '';
    }
    // Moment's month starts from 0
    const month = date.month() + 1;
    const day = date.date();
    const year = date.year();

    return `${year}-${month}-${day}`;
  };
  // eslint-disable-next-line complexity
  const buildRequestParams = (): GetRecommendationRequest => {
    return {
      place: placeInput,
      date_from: formatDate(fromDate),
      date_to: formatDate(toDate),
      // people_num: peopleNumber,
      budget: selectedBudget.length ? selectedBudget : null,
      trip_pace: selectedPace.length ? selectedPace : null,
      interests: selectedInterests.length ? selectedInterests : null,
      trip_type: selectedTripType.length ? selectedTripType : null,
      optional_prompt: inputtedOptionalPrompt.length ? inputtedOptionalPrompt : null,
    };
  };

  const fetchRecommendationData = async (
    apiContext: ApiContext,
    requestParams: GetRecommendationRequest,
  ) => {
    return await client.getRecommendation(apiContext, requestParams);
  };

  const { openSnackbar } = useSnackbar();

  // Handle fetching recommendation data from server when user submit button
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    handleCloseModal();
    let serverResponse: GetRecommendationResponse;
    try {
      const requestParams = buildRequestParams();
      serverResponse = await fetchRecommendationData(
        { useMock: false, requireAuth: false },
        requestParams,
      );
    } catch (error) {
      if (error instanceof Error) {
        openSnackbar(error.message, 'error');
      }
      setIsLoading(false);
      return;
    }

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
      <DialogTitle variant="h4">{ht('dialog-title', { name: placeInput })}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 0 }}>
          <DialogContentText variant="body1">{ht('dialog-content')}</DialogContentText>
          <DateRangeForm
            fromDate={fromDate}
            handleFromDateChange={handleFromDateChange}
            toDate={toDate}
            handleToDateChange={handleToDateChange}
          />
          {/* <PeopleNumberForm
            peopleNumber={peopleNumber}
            handlePeopleNumberChange={handlePeopleNumberChange}
          /> */}
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
          <OptionalPrompt handleChangeInputtedOptionalPrompt={handleChangeInputtedOptionalPrompt} />
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
