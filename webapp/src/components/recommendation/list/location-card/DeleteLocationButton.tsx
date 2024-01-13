import { Delete } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

import { SecondaryColorHoverIconButton } from '@/components/common/mui/SecondaryColorHoverIconButton';
import { useScopedI18n } from '@/locales/client';

type DeleteLocationButtonProps = {
  onConfirmDelete: (placeName: string) => void;
  locationId: string;
};

const DeleteLocationButton = ({ onConfirmDelete, locationId }: DeleteLocationButtonProps) => {
  const t = useScopedI18n('result.tooltip');

  return (
    <SecondaryColorHoverIconButton
      aria-label="Delete"
      onMouseDown={() => onConfirmDelete(locationId)}
    >
      <Tooltip disableFocusListener disableTouchListener title={t('delete')} placement="right">
        <Delete />
      </Tooltip>
    </SecondaryColorHoverIconButton>
  );
};

export default DeleteLocationButton;
