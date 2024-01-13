import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';

import { useScopedI18n } from '@/locales/client';

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
  const t = useScopedI18n('result');

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
