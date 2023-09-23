import { Box, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  fromDate: Date | null;
  handleFromDateChange: (date: Date | null) => void;
  toDate: Date | null;
  handleToDateChange: (date: Date | null) => void;
};

const DateRangeForm = ({ fromDate, handleFromDateChange, toDate, handleToDateChange }: Props) => {
  const { t } = createTranslation('home');

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Typography variant="h6">{t('date-label')}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <DatePicker
          label={t('date-from-label')}
          value={fromDate}
          onChange={(newDate) => handleFromDateChange(newDate)}
        />
        <Typography sx={{ marginY: 'auto' }}>~</Typography>
        <DatePicker
          label={t('date-until-label')}
          value={toDate}
          onChange={(newDate) => handleToDateChange(newDate)}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeForm;
