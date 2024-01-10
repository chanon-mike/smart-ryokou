import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';

import { useScopedI18n } from '@/locales/client';

type DeleteLocationDialogProps = {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  locationId: string;
  handleDelete: (locationId: string) => void;
};

const DeleteLocationDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  locationId,
  handleDelete,
}: DeleteLocationDialogProps) => {
  const t = useScopedI18n('result');

  const closeConfirmationDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Dialog
      open={deleteDialogOpen}
      onClose={closeConfirmationDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t('deleteCardModal.title')}</DialogTitle>
      <DialogActions>
        <Button onMouseDown={closeConfirmationDialog}>{t('deleteCardModal.cancel')}</Button>
        <Button onMouseDown={() => handleDelete(locationId)} autoFocus>
          {t('deleteCardModal.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLocationDialog;
