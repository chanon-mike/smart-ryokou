import { TextField, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import type { ChangeEvent } from 'react';

type Props = {
  handleChangeInputtedOptionalPrompt: (newInput: string) => void;
};

const OptionalPrompt = ({ handleChangeInputtedOptionalPrompt }: Props) => {
  const { t } = createTranslation('home');

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
      />
    </>
  );
};

export default OptionalPrompt;
