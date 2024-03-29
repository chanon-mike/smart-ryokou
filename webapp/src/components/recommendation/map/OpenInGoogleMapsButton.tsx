import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import type { ButtonProps } from '@mui/material';
import { Button, Typography } from '@mui/material';

import { useScopedI18n } from '@/locales/client';

interface OpenInGoogleMapsButtonProps extends ButtonProps {
  placeId: string;
  text?: string;
}

const OpenInGoogleMapsButton = (props: OpenInGoogleMapsButtonProps) => {
  const t = useScopedI18n('result');
  const { placeId, text, ...rest } = props;

  return (
    <Button
      variant="contained"
      fullWidth={true}
      component="a"
      href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      <OpenInNewIcon fontSize="small" />
      <Typography variant="caption" sx={{ ml: 0.5 }} fontSize={8.5} noWrap>
        {text ? text : t('open-in-google-maps')}
      </Typography>
    </Button>
  );
};

export default OpenInGoogleMapsButton;
