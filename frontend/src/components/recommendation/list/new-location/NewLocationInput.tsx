import Client from '@/client/Client';
import type {
  GetNewLocationRequest,
  GetNewLocationResponse,
} from '@/client/api/get-new-location/interface';
import { useSnackbar } from '@/components/common/snackbar/SnackbarContext';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';
import NewLocationCard from '@/components/recommendation/list/new-location/NewLocationCard';
import NewLocationPrompt from '@/components/recommendation/list/new-location/NewLocationPrompt';
import type Session from '@/service/database/session/model';
import type { Location } from '@/types/recommendation';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useContext, useState } from 'react';

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
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { session, setSession } = useContext(RecommendationContext);

  const { t } = createTranslation('result');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const { openSnackbar } = useSnackbar();

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
      serverResponse = await Client.getLocation(
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
      const newLocations = prev.filter((loc) => loc.id !== location.name);
      return newLocations;
    });
    setSession((prev: Session) => {
      const newRecommendations = [...prev.recommendations];
      newRecommendations[dateIndex].locations.push(location);
      return { ...session, recommendations: newRecommendations };
    });
    return;
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
