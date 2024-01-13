import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useContext, useState } from 'react';

import type {
  GetNewLocationRequest,
  GetNewLocationResponse,
} from '@/client/api/get-new-location/interface';
import client from '@/client/client';
import { useSnackbar } from '@/components/common/snackbar/SnackbarContext';
import NewLocationCard from '@/components/recommendation/list/new-location/NewLocationCard';
import NewLocationExampleChip from '@/components/recommendation/list/new-location/NewLocationExampleChip';
import NewLocationPrompt from '@/components/recommendation/list/new-location/NewLocationPrompt';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';
import { saveNewSessionData } from '@/libs/helper';
import { useScopedI18n } from '@/locales/client';
import type Session from '@/server/service/database/session/model';
import type { Location } from '@/types/recommendation';

interface NewLocationInputProps {
  newLocations: Location[];
  setNewLocations: Dispatch<SetStateAction<Location[]>>;
  dateIndex: number;
  open: boolean;
  handleClose: () => void;
}

const NewLocationInput = ({
  newLocations,
  setNewLocations,
  dateIndex,
  open,
  handleClose,
}: NewLocationInputProps) => {
  const { openSnackbar } = useSnackbar();
  const { session, setSession } = useContext(RecommendationContext);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = useScopedI18n('result');

  const newLocationExamplePromptList = [
    { place: t('new-location.park'), prompt: t('new-location.park-prompt') },
    { place: t('new-location.aquarium'), prompt: t('new-location.aquarium-prompt') },
    { place: t('new-location.museum'), prompt: t('new-location.museum-prompt') },
    { place: t('new-location.shrine'), prompt: t('new-location.shrine-prompt') },
    { place: t('new-location.fun'), prompt: t('new-location.fun-prompt') },
  ];

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const buildRequestParams = (): GetNewLocationRequest => {
      const newSuggestedPlaces = session.recommendations.flatMap((recommendation) =>
        recommendation.locations.map((location) => location.name),
      );
      return {
        trip_title: session.tripTitle,
        user_prompt: prompt,
        suggested_places: newSuggestedPlaces,
      };
    };

    let serverResponse: GetNewLocationResponse;
    try {
      const requestParams = buildRequestParams();
      serverResponse = await client.getLocation(
        { useMock: false, requireAuth: false },
        requestParams,
      );
    } catch (error) {
      if (error instanceof Error) {
        openSnackbar(error.message, 'error');
      }
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
      setPrompt('');
    }
    setNewLocations(serverResponse.locations);
  };

  const handleAddLocation = (location: Location) => {
    // When add location, remove that location from newLocations
    setNewLocations((prev: Location[]) => {
      const newLocations = prev.filter((loc) => loc.id !== location.id);
      return newLocations;
    });
    setSession((prev: Session) => {
      const newRecommendations = [...prev.recommendations];
      newRecommendations[dateIndex].locations.push(location);
      return { ...session, recommendations: newRecommendations };
    });
    saveNewSessionData(session);
  };

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose}>
      <DialogTitle>{t('input.title')}</DialogTitle>
      <DialogContent>
        <NewLocationPrompt
          isLoading={isLoading}
          prompt={prompt}
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: 2,
            gap: 1,
            overflowX: 'auto',
          }}
        >
          {newLocationExamplePromptList.map((prompt, index) => (
            <NewLocationExampleChip
              key={`${prompt}${index}`}
              data={prompt}
              setPrompt={setPrompt}
              isLoading={isLoading}
            />
          ))}
        </Box>
        <Box display="flex" justifyContent="center" my={2} gap={2}>
          {newLocations.map((location, index) => (
            <NewLocationCard
              key={`${location.name}${index}`}
              location={location}
              handleAddLocation={handleAddLocation}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewLocationInput;
