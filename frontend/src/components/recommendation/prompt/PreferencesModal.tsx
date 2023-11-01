'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { usePreferences } from '@/components/recommendation/prompt/usePreferences';
import TripTypeForm from '@/components/recommendation/prompt/form/TripTypeForm';
import DateRangeForm from '@/components/recommendation/prompt/form/DateRangeForm';
import PeopleNumberForm from '@/components/recommendation/prompt/form/PeopleNumberForm';
import PaceForm from '@/components/recommendation/prompt/form/PaceForm';
import BudgetForm from '@/components/recommendation/prompt/form/BudgetForm';
import InterestsForm from '@/components/recommendation/prompt/form/InterestsForm';
import createTranslation from 'next-translate/useTranslation';
import Client from '@/client/Client';
import type { ApiContext } from '@/client/ApiContext';
import type { GetResultRequest, GetResultResponse } from '@/client/api/GetResult/interface';
import { type Dispatch, type SetStateAction } from 'react';
import SessionClient from '@/client/service/session/implement';
import { useRouter } from 'next/navigation';
import { generateObjectId } from '@/components/common/helper';

type PreferencesModalProps = {
  placeInput: string;
  openModal: boolean;
  handleCloseModal: () => void;
  transitionToResultCallback: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const PreferencesModal = ({
  placeInput,
  openModal,
  handleCloseModal,
  transitionToResultCallback,
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

  // Handle fetching recommendation data from server when user submit button
  const handleSubmit = async () => {
    // try {
    //   router.push('/test');
    // } catch (e) {
    //   console.error(e);
    // }
    // return;
    setIsLoading(true);
    handleCloseModal();

    let serverResponse: GetResultResponse;
    try {
      const requestParams = buildRequestParams();
      serverResponse = await fetchRecommendationData(
        { useMock: false, requireAuth: false },
        requestParams,
      );
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      return;
    } finally {
      setIsLoading(false);
    }

    const sessionClient = new SessionClient();

    await sessionClient.insert({
      _id: generateObjectId(),
      isDeleted: false,
      userId: 'test',
      tripTitle: serverResponse.title,
      recommendations: serverResponse.recommendations,
    });

    try {
      router.push('/test');
    } catch (e) {
      console.error(e);
    }
    return;

    transitionToResultCallback();
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
