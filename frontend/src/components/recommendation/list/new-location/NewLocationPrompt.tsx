import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

interface NewLocationPromptProps {
  isLoading: boolean;
  prompt: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewLocationPrompt = ({
  isLoading,
  prompt,
  handleSubmit,
  handleOnChange,
}: NewLocationPromptProps) => {
  const { t } = createTranslation('result');

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        fullWidth
        required
        variant="standard"
        autoComplete="off"
        placeholder={t('input.placeholder')}
        value={prompt}
        onChange={handleOnChange}
        disabled={isLoading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AutoAwesomeIcon color="secondary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isLoading === true ? (
                <CircularProgress size={20} />
              ) : (
                <IconButton type="submit">
                  <SendIcon color="primary" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default NewLocationPrompt;
