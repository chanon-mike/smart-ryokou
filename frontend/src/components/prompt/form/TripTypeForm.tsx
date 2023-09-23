import type { SelectChangeEvent } from '@mui/material';
import { Select, MenuItem, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  selectedTripTypes: string;
  handleSelectTripType: (e: SelectChangeEvent) => void;
};

const TripTypeForm = ({ selectedTripTypes, handleSelectTripType }: Props) => {
  const { t } = createTranslation('home');

  return (
    <>
      <Typography variant="h6">{t('trip-type-label')}</Typography>
      <Select value={selectedTripTypes} onChange={handleSelectTripType}>
        <MenuItem value="一人">{t('trip-type.solo')}</MenuItem>
        <MenuItem value="カップル">{t('trip-type.couple')}</MenuItem>
        <MenuItem value="家族">{t('trip-type.family')}</MenuItem>
        <MenuItem value="友達">{t('trip-type.friends')}</MenuItem>
        <MenuItem value="ビジネス">{t('trip-type.business')}</MenuItem>
        <MenuItem value="バックパッカー">{t('trip-type.backpacker')}</MenuItem>
      </Select>
    </>
  );
};

export default TripTypeForm;
