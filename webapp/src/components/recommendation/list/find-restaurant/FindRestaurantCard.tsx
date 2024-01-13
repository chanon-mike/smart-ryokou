import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Card, CardContent, CardMedia, IconButton, Rating, Typography } from '@mui/material';

import type { Location } from '@/types/recommendation';

import OpenInGoogleMapsButton from '../../map/OpenInGoogleMapsButton';

interface FindRestaurantCardProps {
  location: Location;
  handleAddLocation: (restaurant: Location) => void;
}

const FindRestaurantCard = ({ location, handleAddLocation }: FindRestaurantCardProps) => {
  return (
    <Card key={location.name} variant="elevation" sx={{ width: { sm: 1 / 6, xs: 4 / 6 } }}>
      <CardMedia component="img" height="100px" image={location.photo} alt={location.name} />
      <CardContent>
        <Typography gutterBottom variant="body1">
          {location.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 0.25,
            marginBottom: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            {location.rating}
          </Typography>
          <Rating value={location.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
            ({location.userRatingCount})
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" color="text.secondary" noWrap>
            {location.description}
          </Typography>
          <OpenInGoogleMapsButton
            placeId={location.placeId}
            sx={{
              p: 0.2,
              boxShadow: 0,
              fontSize: '0.2rem',
              justifyContent: 'space-evenly',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '15rem',
            }}
            color="primary"
            variant="contained"
          />
          <IconButton sx={{ padding: 0.5 }} onClick={() => handleAddLocation(location)}>
            <AddCircleOutlineIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
export default FindRestaurantCard;
