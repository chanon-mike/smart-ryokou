import type { SelectChangeEvent } from '@mui/material';
import { MenuItem, Select, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  selectedBudget: string;
  handleSelectBudget: (e: SelectChangeEvent) => void;
};

const PaceForm = ({ selectedBudget, handleSelectBudget }: Props) => {
  const { t } = createTranslation('home');

  const budgets = [
    { label: t('budget.low'), value: 'low' },
    { label: t('budget.medium'), value: 'medium' },
    { label: t('budget.high'), value: 'high' },
  ];

  return (
    <>
      <Typography variant="h6">{t('budget-label')}</Typography>
      <Select value={selectedBudget} onChange={handleSelectBudget} size="small">
        {budgets.map((budget) => (
          <MenuItem key={budget.value} value={budget.value}>
            {budget.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default PaceForm;
