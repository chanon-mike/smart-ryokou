import type { SelectChangeEvent } from '@mui/material';
import { MenuItem, Select, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  selectedTripTypes: string;
  handleSelectTripType: (e: SelectChangeEvent) => void;
};

const TripTypeForm = ({ selectedTripTypes, handleSelectTripType }: Props) => {
  const { t } = createTranslation('home');

  const tripTypes = [
    { label: t('trip-type.solo'), value: 'solo' },
    { label: t('trip-type.couple'), value: 'couple' },
    { label: t('trip-type.family'), value: 'family' },
    { label: t('trip-type.friends'), value: 'friends' },
    // { label: t('trip-type.business'), value: 'business' },
    // { label: t('trip-type.backpacker'), value: 'backpacker' },
  ];

  return (
    <>
      <Typography variant="h6">{t('trip-type-label')}</Typography>
      <Select value={selectedTripTypes} onChange={handleSelectTripType} size="small">
        {tripTypes.map((tripType) => (
          <MenuItem key={tripType.value} value={tripType.value}>
            {tripType.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default TripTypeForm;
