import ShareIcon from '@mui/icons-material/Share';
import { IconButton } from '@mui/material';

import { useSnackbar } from '@/components/common/snackbar/SnackbarContext';

const CopyToClipboard = () => {
  const { openSnackbar } = useSnackbar();
  const currentUrl = window.location.href;

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    openSnackbar('Copied to clipboard');
  };

  return (
    <IconButton onClick={copyUrlToClipboard}>
      <ShareIcon color="action" />
    </IconButton>
  );
};

export default CopyToClipboard;
