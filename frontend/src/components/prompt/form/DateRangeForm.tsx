import { Box, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import createTranslation from 'next-translate/useTranslation';

const DateRangeForm = () => {
  const { t } = createTranslation('home');

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Typography variant="h6">{t('date-label')}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <DatePicker label={t('date-from-label')} />
        <Typography sx={{ marginY: 'auto' }}>~</Typography>
        <DatePicker label={t('date-until-label')} />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeForm;
