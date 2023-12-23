import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Box, Typography } from '@mui/material';

type DistanceMatrixStepProps = {
  distance: string;
  duration: string;
};

const DistanceMatrixStep = ({ distance, duration }: DistanceMatrixStepProps) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography variant="caption">{distance}</Typography>
      <KeyboardArrowDownIcon />
      <Typography variant="caption">{duration}</Typography>
      <DirectionsCarIcon fontSize="small" />
    </Box>
  );
};

export default DistanceMatrixStep;
