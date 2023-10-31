import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import createTranslation from 'next-translate/useTranslation';
import type { Location } from '@/types/recommendation';
import { useState } from 'react';

// TODO: Remove mock data when api call is ready
const mockLocations: Location[] = [
  {
    name: 'Tokyo Tower',
    description: 'mock',
    imageUrl:
      'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
    lat: 30,
    lng: 30,
  },
  {
    name: 'Tokyo Skytree',
    description: 'mock',
    imageUrl:
      'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
    lat: 30,
    lng: 30,
  },
  {
    name: 'Asakusa Temple',
    description: 'mock',
    imageUrl:
      'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
    lat: 30,
    lng: 30,
  },
  {
    name: 'Harajuku',
    description: 'mock',
    imageUrl:
      'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
    lat: 30,
    lng: 30,
  },
  {
    name: 'Shibuya Crossing',
    description: 'mock',
    imageUrl:
      'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
    lat: 30,
    lng: 30,
  },
  {
    name: 'Shinjuku',
    description: 'mock',
    imageUrl:
      'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk',
    lat: 30,
    lng: 30,
  },
];

interface NewLocationInputProps {
  open: boolean;
  handleClose: () => void;
}

const NewLocationInput = ({ open, handleClose }: NewLocationInputProps) => {
  const [addedLocations, setAddedLocations] = useState<Location[]>([]);

  const { t } = createTranslation('result');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
  };

  const handleAddLocation = (location: Location) => {
    setAddedLocations((prev: Location[]) => [...prev, location]);
  };

  return (
    <Dialog fullWidth={true} maxWidth={'lg'} open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{t('input.title')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
                  <IconButton type="submit">
                    <SendIcon color="primary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box display="flex" justifyContent="center" my={2} gap={2}>
            {mockLocations.map((location) => (
              <Card key={location.name} variant="elevation" sx={{ width: 1 / 6 }}>
                <CardMedia component="img" height="100px" image={location.imageUrl} alt="Image" />
                <CardContent>
                  <Typography gutterBottom variant="body1">
                    {location.name}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {location.description}
                    </Typography>
                    {!addedLocations.includes(location) ? (
                      <IconButton sx={{ padding: 0.5 }} onClick={() => handleAddLocation(location)}>
                        <AddCircleOutlineIcon color="inherit" fontSize="small" />
                      </IconButton>
                    ) : (
                      <CheckCircleOutlineIcon color="success" fontSize="small" />
                    )}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default NewLocationInput;
