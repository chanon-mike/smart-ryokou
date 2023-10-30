import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import createTranslation from 'next-translate/useTranslation';

interface NewLocationInputProps {
  open: boolean;
  handleClose: () => void;
}

const NewLocationInput = ({ open, handleClose }: NewLocationInputProps) => {
  const { t } = createTranslation('result');

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose}>
      <DialogTitle>{t('input.title')}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          required
          variant="standard"
          autoComplete="off"
          placeholder={t('input.placeholder')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AutoAwesomeIcon color="secondary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClose}>
                  <SendIcon color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewLocationInput;
