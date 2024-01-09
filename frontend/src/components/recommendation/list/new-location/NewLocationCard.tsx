import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Card, CardContent, CardMedia, IconButton, Rating, Typography } from '@mui/material';

import type { Location } from '@/types/recommendation';

interface NewLocationCardProps {
  location: Location;
  handleAddLocation: (location: Location) => void;
}

const NewLocationCard = ({ location, handleAddLocation }: NewLocationCardProps) => {
  return (
    <Card key={location.name} variant="elevation" sx={{ width: 1 / 6 }}>
      <CardMedia component="img" height="100px" image={location.photo} alt={location.name} />
      <CardContent>
        <Typography gutterBottom variant="body1">
          {location.name}
        </Typography>
        {location.rating && location.userRatingCount && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            <Typography variant="body2" color="text.secondary">
              {location.rating}
            </Typography>
            <Rating value={location.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              ({location.userRatingCount})
            </Typography>
          </Box>
        )}
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
          <IconButton sx={{ padding: 0.5 }} onClick={() => handleAddLocation(location)}>
            <AddCircleOutlineIcon color="inherit" fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
export default NewLocationCard;
