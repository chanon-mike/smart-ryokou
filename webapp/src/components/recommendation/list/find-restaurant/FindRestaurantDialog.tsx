import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import FindRestaurantCard from '@/components/recommendation/list/find-restaurant/FindRestaurantCard';
import { useScopedI18n } from '@/locales/client';
import type { Location } from '@/types/recommendation';

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
  const t = useScopedI18n('result');

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
          <Box
            sx={{
              display: 'flex',
              flexDirection: { sm: 'row', xs: 'column' },
              justifyContent: 'center',
              alignItems: 'center',
              marginY: 2,
              gap: 2,
            }}
          >
            {restaurants.length === 0 && (
              <Typography variant="body1" color="text.secondary">
                {t('no-restaurant-found')}
              </Typography>
            )}
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
