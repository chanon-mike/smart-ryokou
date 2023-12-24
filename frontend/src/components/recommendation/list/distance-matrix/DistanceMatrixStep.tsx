import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box, Typography } from '@mui/material';

type DistanceMatrixStepProps = {
  distance: string;
  duration: string;
};

const DistanceMatrixStep = ({ distance, duration }: DistanceMatrixStepProps) => {
  // TODO: Change to warning color when distance is unknown
  const colorIsNotAvailable = distance === '不明' || duration === '不明';
  const textColorIfisNotAvailable = colorIsNotAvailable ? 'warning.main' : 'inherit';
  const colorIfisNotAvailable = colorIsNotAvailable ? 'warning' : 'inherit';

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography variant="caption" color={textColorIfisNotAvailable}>
        {distance}
      </Typography>
      <KeyboardArrowDownIcon color={colorIfisNotAvailable} />
      <Typography variant="caption" color={textColorIfisNotAvailable}>
        {duration}
      </Typography>
      <DirectionsCarIcon fontSize="small" color={colorIfisNotAvailable} />
    </Box>
  );
};

export default DistanceMatrixStep;
