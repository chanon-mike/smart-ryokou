import DirectionsIcon from '@mui/icons-material/Directions';
import {
  Box,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';

import { useScopedI18n } from '@/locales/client';
import type { Location } from '@/types/recommendation';

import OpenInGoogleMapsButton from './OpenInGoogleMapsButton';

interface LocationDetailProps {
  activeLocation: Location;
}

const LocationDetail = ({ activeLocation }: LocationDetailProps) => {
  const t = useScopedI18n('result.tooltip');

  return (
    <Paper
      elevation={1}
      sx={{
        position: 'absolute',
        right: { sm: '10%', xs: '5%' },
        bottom: '5%',
        width: '80%',
        padding: '16px',
        overflow: 'auto',
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="100px"
            width="100px"
            image={activeLocation.photo}
            alt={activeLocation.name}
            style={{ flex: '0 0 30%' }}
          />
        </Grid>
        <Grid item xs={8}>
          <Box style={{ flex: '0 0 70%', paddingLeft: '16px' }}>
            <Typography variant="h6">{activeLocation.name}</Typography>
            {activeLocation.rating && activeLocation.userRatingCount && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 0.3 }}>
                <Typography variant="body2" color="text.secondary">
                  {activeLocation.rating}
                </Typography>
                <Rating value={activeLocation.rating} precision={0.1} size="small" readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({activeLocation.userRatingCount})
                </Typography>
              </Box>
            )}
            <Typography variant="body2" color="text.secondary">
              {activeLocation.description}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}
        />
      </Grid>
      <Box sx={{ display: 'flex', mt: 1, gap: 1, alignContent: 'center' }}>
        <Box sx={{ width: '33%' }}>
          <OpenInGoogleMapsButton placeId={activeLocation.placeId} />
        </Box>
        <Tooltip title={t('search-destination')}>
          <IconButton
            aria-label="directions"
            href={`https://www.google.com/maps?saddr=My+Location&daddr=${activeLocation.lat},${activeLocation.lng}&travelmode=walk`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ p: 0.75 }}
          >
            <DirectionsIcon color="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default LocationDetail;
// https://www.google.com/maps?saddr=My+Location&daddr=43.12345,-76.12345
