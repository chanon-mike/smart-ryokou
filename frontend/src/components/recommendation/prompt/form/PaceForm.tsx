import type { SelectChangeEvent } from '@mui/material';
import { Typography, Select, MenuItem } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  selectedPace: string;
  handleSelectPace: (e: SelectChangeEvent) => void;
};

const PaceForm = ({ selectedPace, handleSelectPace }: Props) => {
  const { t } = createTranslation('home');

  const paces = [
    { label: t('pace.relaxed'), value: 'relaxed' },
    { label: t('pace.normal'), value: 'normal' },
    { label: t('pace.packed'), value: 'packed' },
  ];

  return (
    <>
      <Typography variant="h6">{t('pace-label')}</Typography>
      <Select value={selectedPace} onChange={handleSelectPace} size="small">
        {paces.map((pace) => (
          <MenuItem key={pace.value} value={pace.value}>
            {pace.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default PaceForm;
