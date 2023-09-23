import type { SelectChangeEvent } from '@mui/material';
import { Typography, Select, MenuItem } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  selectedPace: string;
  handleSelectPace: (e: SelectChangeEvent) => void;
};

const PaceForm = ({ selectedPace, handleSelectPace }: Props) => {
  const { t } = createTranslation('home');

  return (
    <>
      <Typography variant="h6">{t('pace-label')}</Typography>
      <Select value={selectedPace} onChange={handleSelectPace}>
        <MenuItem value="ゆっくり">{t('pace.relaxed')}</MenuItem>
        <MenuItem value="普通">{t('pace.normal')}</MenuItem>
        <MenuItem value="せっかち">{t('pace.packed')}</MenuItem>
      </Select>
    </>
  );
};

export default PaceForm;
