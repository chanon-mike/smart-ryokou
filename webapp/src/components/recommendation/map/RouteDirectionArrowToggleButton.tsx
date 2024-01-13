import { FormControlLabel, Switch, Typography } from '@mui/material';
import { useContext } from 'react';

import { DisplayRoutesContext } from '@/components/recommendation/DisplayRoutesContext';
import { useScopedI18n } from '@/locales/client';

const RouteDirectionArrowToggleButton = () => {
  const t = useScopedI18n('result');
  const { displayRoutes, setDisplayRoutes } = useContext(DisplayRoutesContext);

  return (
    <FormControlLabel
      control={
        <Switch
          checked={displayRoutes}
          onChange={() => setDisplayRoutes(!displayRoutes)}
          color="primary"
          size="small"
        />
      }
      label={
        <Typography variant="subtitle2" color="textSecondary" sx={{ userSelect: 'none' }} noWrap>
          {t('display-routes')}
        </Typography>
      }
    />
  );
};

export default RouteDirectionArrowToggleButton;
