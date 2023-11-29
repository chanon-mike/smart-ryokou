'use client';
import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useTranslation from 'next-translate/useTranslation';

import MapConfigs from '@/libs/MapConfigs';

const { API_KEY } = MapConfigs();

type Props = {
  placeInput: string;
  setPlaceInput: React.Dispatch<React.SetStateAction<string>>;
  handleOpenModal: () => void;
};

const InputBar = ({ placeInput, setPlaceInput, handleOpenModal }: Props) => {
    const { t } = useTranslation('home');
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  
    // Function to format the address as per your requirements
    const formatShortAddress = (place: google.maps.places.PlaceResult): string => {
      const city = place.address_components.find((component) =>
        component.types.includes('locality')
      )?.long_name;
  
      const prefecture = place.address_components.find((component) =>
        component.types.includes('administrative_area_level_1')
      )?.long_name;
  
      const country = place.address_components.find((component) =>
        component.types.includes('country')
      )?.long_name;
  
      // Customize the address format as needed
      return `${city}, ${prefecture}, ${country}`;
    };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      const input = document.getElementById('search') as HTMLInputElement;

      const options = {
        types: ['establishment'],
      };

      const autoCompleteInstance = new google.maps.places.Autocomplete(input, options);
      setAutocomplete(autoCompleteInstance);

      autoCompleteInstance.addListener('place_changed', () => {
        const place = autoCompleteInstance.getPlace();

        if (place.geometry && place.geometry.location) {
          // Shorten the address (e.g., take only the first two lines)
          const shortenedAddress = formatShortAddress(place);
          setPlaceInput(shortenedAddress);
        } else {
          console.error('Error retrieving place details:', place);
        }
      });

    };

    document.head.appendChild(script);

    return () => {
      // Cleanup the script tag to avoid memory leaks
      document.head.removeChild(script);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(event.target.value);
  };

  const handleSearchClick = () => {
    // Trigger form submission when the search icon is clicked
    handleOpenModal();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted!');
    handleOpenModal();
  };

  return (
    <form
      style={{
        padding: 20,
        width: '600px',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        required
        id="search"
        type="text"
        placeholder={t('input-message')}
        value={placeInput}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button onClick={handleSearchClick} style={{ cursor: 'pointer' }}>
                <SearchIcon />
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default InputBar;
