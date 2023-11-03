import Client from '@/client/Client';
import type {
  GetNewLocationRequest,
  GetNewLocationResponse,
} from '@/client/api/get-new-location/interface';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';
import NewLocationCard from '@/components/recommendation/list/new-location/NewLocationCard';
import NewLocationPrompt from '@/components/recommendation/list/new-location/NewLocationPrompt';
import type { Location, Recommendation } from '@/types/recommendation';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import { useContext, useState } from 'react';

interface NewLocationInputProps {
  dateIndex: number;
  open: boolean;
  handleClose: () => void;
}

const NewLocationInput = ({ dateIndex, open, handleClose }: NewLocationInputProps) => {
  const [newLocations, setNewLocations] = useState<Location[]>([]);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { recommendations, setRecommendations } = useContext(RecommendationContext);

  const { t } = createTranslation('result');

  const handleOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const buildRequestParams = (): GetNewLocationRequest => {
      const newSuggestedPlaces = recommendations.flatMap((recommendation) =>
        recommendation.locations.map((location) => location.name),
      );
      return {
        // TODO: change triptitle
        trip_title: '東京観光',
        user_prompt: prompt,
        suggested_places: newSuggestedPlaces,
      };
    };

    let serverResponse: GetNewLocationResponse;
    try {
      const requestParams = buildRequestParams();
      serverResponse = await Client.getLocation(
        { useMock: true, requireAuth: false },
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
    setNewLocations(serverResponse.locations);
  };

  const handleAddLocation = (location: Location) => {
    // When add location, remove that location from newLocations
    setNewLocations((prev: Location[]) => {
      const newLocations = prev.filter((loc) => loc.name !== location.name);
      return newLocations;
    });
    setRecommendations((prev: Recommendation[]) => {
      const newRecommendations = [...prev];
      newRecommendations[dateIndex].locations.push(location);
      return newRecommendations;
    });

    return;
  };

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose}>
      <DialogTitle>{t('input.title')}</DialogTitle>
      <DialogContent>
        <NewLocationPrompt
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleOnClick={handleOnClick}
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
