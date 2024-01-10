import DiningIcon from '@mui/icons-material/Dining';
import { Tooltip } from '@mui/material';

import { SecondaryColorHoverIconButton } from '@/components/common/mui/SecondaryColorHoverIconButton';
import { useScopedI18n } from '@/locales/client';
import type { Location } from '@/types/recommendation';

type FindRestaurantButtonProps = {
  onFindRestaurant?: (recIndex: number, dateIndex: number, location: Location) => void;
  recIndex: number;
  dateIndex: number;
  location: Location;
};

const FindRestaurantButton = ({
  onFindRestaurant,
  recIndex,
  dateIndex,
  location,
}: FindRestaurantButtonProps) => {
  const t = useScopedI18n('result.tooltip');

  return (
    <SecondaryColorHoverIconButton
      aria-label="Find Restaurant"
      onMouseDown={() => {
        if (onFindRestaurant) {
          onFindRestaurant(recIndex, dateIndex, location);
        }
      }}
    >
      <Tooltip disableFocusListener disableTouchListener title={t('restaurant')} placement="right">
        <DiningIcon />
      </Tooltip>
    </SecondaryColorHoverIconButton>
  );
};

export default FindRestaurantButton;
