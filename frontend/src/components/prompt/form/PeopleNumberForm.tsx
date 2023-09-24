import { Typography, TextField } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import type { ChangeEvent } from 'react';

type Props = {
  peopleNumber: number;
  handlePeopleNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PeopleNumberForm = ({ peopleNumber, handlePeopleNumberChange }: Props) => {
  const { t } = createTranslation('home');

  return (
    <>
      <Typography variant="h6">{t('people-number-label')}</Typography>
      <TextField
        type="number"
        error={peopleNumber < 1}
        value={peopleNumber}
        onChange={handlePeopleNumberChange}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
        }}
      />
    </>
  );
};

export default PeopleNumberForm;
