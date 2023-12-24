import type { DistanceMatrix } from '@/types/distance';
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Skeleton, Tooltip, Typography } from '@mui/material';
import moment from 'moment';

type TotalDurationProps = {
  distanceMatrix: DistanceMatrix[];
  isLoadingDistanceMatrix: boolean;
};

const TotalDuration = ({ isLoadingDistanceMatrix, distanceMatrix }: TotalDurationProps) => {
  if (isLoadingDistanceMatrix) {
    return <Skeleton variant="text" sx={{ marginLeft: 'auto', width: '10%' }} />;
  }

  // const totalDuration = moment.utc(1000 * totalDistanceMatrix.duration).format('H[h] mm[m]');
  const totalDuration = moment
    .utc(
      distanceMatrix.reduce((acc, curr) => {
        return acc + curr.duration.value;
      }, 0) * 1000,
    )
    .format('H[h] mm[m]');

  return (
    <Tooltip disableFocusListener disableTouchListener title="移動時間" placement="top">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: 'auto',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'default',
        }}
      >
        <TimerIcon fontSize="small" color="action" />
        <Typography variant="subtitle1">{totalDuration}</Typography>
      </Box>
    </Tooltip>
  );
};

export default TotalDuration;
