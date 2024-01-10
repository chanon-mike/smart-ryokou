import TimerIcon from '@mui/icons-material/Timer';
import { Box, Skeleton, Tooltip, Typography } from '@mui/material';
import moment from 'moment';

import { useScopedI18n } from '@/locales/client';
import type { DistanceMatrix } from '@/types/distance';

type TotalDurationProps = {
  distanceMatrix: DistanceMatrix[];
  isLoadingDistanceMatrix: boolean;
};

const TotalDuration = ({ isLoadingDistanceMatrix, distanceMatrix }: TotalDurationProps) => {
  const t = useScopedI18n('result');

  if (isLoadingDistanceMatrix) {
    return <Skeleton variant="text" sx={{ marginLeft: 'auto', width: '10%' }} />;
  }

  const totalDuration = moment
    .utc(
      distanceMatrix.reduce((acc, curr) => {
        return acc + curr.duration.value;
      }, 0) * 1000,
    )
    .format('H[h] mm[m]');

  return (
    <Tooltip disableFocusListener disableTouchListener title={t('total-duration')} placement="top">
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
