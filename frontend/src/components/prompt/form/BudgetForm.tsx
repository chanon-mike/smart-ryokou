import type { SelectChangeEvent } from '@mui/material';
import { Typography, Select, MenuItem } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  selectedBudget: string;
  handleSelectBudget: (e: SelectChangeEvent) => void;
};

const PaceForm = ({ selectedBudget, handleSelectBudget }: Props) => {
  const { t } = createTranslation('home');

  return (
    <>
      <Typography variant="h6">{t('budget-label')}</Typography>
      <Select value={selectedBudget} onChange={handleSelectBudget}>
        <MenuItem value="安い">{t('budget.low')}</MenuItem>
        <MenuItem value="普通">{t('budget.medium')}</MenuItem>
        <MenuItem value="高級">{t('budget.high')}</MenuItem>
      </Select>
    </>
  );
};

export default PaceForm;
