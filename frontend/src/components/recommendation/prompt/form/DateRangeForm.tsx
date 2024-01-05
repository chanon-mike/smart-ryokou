import { Box, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import type { Moment } from 'moment';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  fromDate: Moment | null;
  handleFromDateChange: (date: Moment | null) => void;
  toDate: Moment | null;
  handleToDateChange: (date: Moment | null) => void;
};

const DateRangeForm = ({ fromDate, handleFromDateChange, toDate, handleToDateChange }: Props) => {
  const { t } = createTranslation('home');

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Typography variant="h6">{t('date-label')}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <DatePicker
          sx={{ width: '100%' }}
          label={t('date-from-label')}
          value={fromDate}
          maxDate={toDate}
          onChange={(newDate) => handleFromDateChange(newDate)}
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />
        <Typography sx={{ marginY: 'auto' }}>~</Typography>
        <DatePicker
          sx={{ width: '100%' }}
          label={t('date-until-label')}
          value={toDate}
          minDate={fromDate}
          onChange={(newDate) => handleToDateChange(newDate)}
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateRangeForm;
