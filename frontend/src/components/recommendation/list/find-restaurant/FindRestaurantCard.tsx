import type { Location } from '@/types/recommendation';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface FindRestaurantCardProps {
  location: Location;
  handleAddLocation: (restaurant: Location) => void;
}

const FindRestaurantCard = ({ location, handleAddLocation }: FindRestaurantCardProps) => {
  return (
    <Card key={location.name} variant="elevation" sx={{ width: 1 / 6 }}>
      <CardMedia component="img" height="100px" image={location.imageUrl} alt={location.name} />
      <CardContent>
        <Typography gutterBottom variant="body1">
          {location.name}
        </Typography>
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
export default FindRestaurantCard;
