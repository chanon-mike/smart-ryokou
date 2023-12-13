'use client';

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import React, { useEffect, useRef } from 'react';
import { InputAdornment, Button, TextField } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';

import { useLoadScript } from '@react-google-maps/api';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  placeInput: string;
  setPlaceInput: Dispatch<SetStateAction<string>>;
  handleOpenModal: () => void;
};

const InputBar = ({ placeInput, setPlaceInput, handleOpenModal }: Props) => {
  const { t, lang } = useTranslation('home');
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    language: lang,
  });

  useEffect(() => {
    const initAutocomplete = () => {
      const options = {
        types: ['administrative_area_level_1', 'country'],
      };

      if (isLoaded && window.google && inputRef.current) {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          options,
        );

        autoCompleteRef.current.addListener('place_changed', async () => {
          const place = await autoCompleteRef.current?.getPlace();
          console.log(place);
          if (place && place.formatted_address !== undefined) {
            setPlaceInput(place.formatted_address);
          }
        });
      }
    };

    initAutocomplete();

    return () => {
      if (autoCompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autoCompleteRef.current);
      }
    };
  }, [isLoaded, setPlaceInput]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaceInput(event.target.value);
  };

  const handleSearchIconClick = () => {
    if (placeInput.trim() !== '') {
      handleOpenModal();
    }
  };

  return (
    <TextField
      fullWidth
      required
      id="autocomplete"
      type="text"
      autoComplete="off"
      placeholder={t('input-message')}
      value={placeInput}
      inputRef={inputRef}
      onChange={handleChange}
      style={{ padding: 20, width: '600px' }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AutoAwesomeIcon color="primary" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Button
              onClick={handleSearchIconClick}
              style={{ cursor: placeInput.trim() !== '' ? 'pointer' : 'default' }}
            >
              <SearchIcon color="secondary" />
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputBar;
