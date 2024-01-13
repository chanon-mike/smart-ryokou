import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Tooltip } from '@mui/material';

import { useSnackbar } from '@/components/common/snackbar/SnackbarContext';
import { useScopedI18n } from '@/locales/client';

const CopyToClipboard = () => {
  const t = useScopedI18n('result');
  const { openSnackbar } = useSnackbar();
  const currentUrl = window.location.href;

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    openSnackbar(t('copy-to-clipboard'));
  };

  return (
    <IconButton onClick={copyUrlToClipboard}>
      <Tooltip
        disableFocusListener
        disableTouchListener
        title={t('tooltip.copy-url')}
        placement="top"
      >
        <ShareIcon color="action" />
      </Tooltip>
    </IconButton>
  );
};

export default CopyToClipboard;
