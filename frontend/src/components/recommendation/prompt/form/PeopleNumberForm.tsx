import { TextField, Typography } from '@mui/material';
import type { ChangeEvent } from 'react';

import { useScopedI18n } from '@/locales/client';

type Props = {
  peopleNumber: number;
  handlePeopleNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PeopleNumberForm = ({ peopleNumber, handlePeopleNumberChange }: Props) => {
  const t = useScopedI18n('home');

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
