import { TextField, Typography } from '@mui/material';
import type { ChangeEvent } from 'react';

import { useScopedI18n } from '@/locales/client';

type Props = {
  handleChangeInputtedOptionalPrompt: (newInput: string) => void;
};

const OptionalPrompt = ({ handleChangeInputtedOptionalPrompt }: Props) => {
  const t = useScopedI18n('home');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChangeInputtedOptionalPrompt(event.target.value);
  };
  return (
    <>
      <Typography variant="h6">{t('optional-prompt-label')}</Typography>
      <TextField
        size="small"
        fullWidth
        placeholder={t('optional-prompt-placeholder')}
        id="fullWidth"
        onChange={handleInputChange}
        autoComplete="off"
      />
    </>
  );
};

export default OptionalPrompt;
