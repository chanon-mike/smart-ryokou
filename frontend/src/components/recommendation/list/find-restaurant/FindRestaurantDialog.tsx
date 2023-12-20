import { Dialog, DialogTitle, DialogContent, Box, CircularProgress } from '@mui/material';
import FindRestaurantCard from './FindRestaurantCard';
import type { Location } from '@/types/recommendation';
import createTranslation from 'next-translate/useTranslation';

type FindRestaurantDialogProps = {
  findRestaurantOpen: boolean;
  restaurants: Location[];
  loadingRestaurants: boolean;
  handleCloseDialog: () => void;
  handleSelectRestaurant: (restaurant: Location) => void;
};

const FindRestaurantDialog = ({
  findRestaurantOpen,
  restaurants,
  loadingRestaurants,
  handleCloseDialog,
  handleSelectRestaurant,
}: FindRestaurantDialogProps) => {
  const { t } = createTranslation('result');

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={findRestaurantOpen} onClose={handleCloseDialog}>
      <DialogTitle>{t('restaurant-title')}</DialogTitle>
      <DialogContent>
        {loadingRestaurants ? (
          // Show a CircularProgress spinner while loading
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        ) : (
          // Actual content with the list of restaurants
          <Box display="flex" justifyContent="center" my={2} gap={2}>
            {restaurants.map((restaurant, index) => (
              <FindRestaurantCard
                key={`${restaurant.name}-${index}`}
                location={restaurant}
                handleAddLocation={handleSelectRestaurant}
              />
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FindRestaurantDialog;
