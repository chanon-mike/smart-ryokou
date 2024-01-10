import { Box } from '@mui/material';
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

import CopyToClipboard from './CopyToClipboard';

const ShareSocial = () => {
  const currentUrl = window.location.href;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <CopyToClipboard />
      <Box sx={{ pt: 0.75 }}>
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={24} round />
        </FacebookShareButton>
        <TwitterShareButton url={currentUrl}>
          <XIcon size={24} round />
        </TwitterShareButton>
        <LineShareButton url={currentUrl}>
          <LineIcon size={24} round />
        </LineShareButton>
      </Box>
    </Box>
  );
};

export default ShareSocial;
