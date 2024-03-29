'use client';

import './autocomplete.css';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import type { Libraries } from '@react-google-maps/api';
import { useLoadScript } from '@react-google-maps/api';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { GOOGLE_MAPS_API_KEY } from '@/libs/envValues';
import { useCurrentLocale, useScopedI18n } from '@/locales/client';

type Props = {
  placeInput: string;
  setPlaceInput: Dispatch<SetStateAction<string>>;
};

const InputBar = ({ placeInput, setPlaceInput }: Props) => {
  const t = useScopedI18n('home');
  const lang = useCurrentLocale();
  const [libraries] = useState<Libraries>(['places']);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete>();
  const inputRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
    language: lang as string,
  });

  useEffect(() => {
    const initAutocomplete = () => {
      const options = {
        types: ['locality', 'administrative_area_level_1', 'country'],
      };

      if (isLoaded && window.google && inputRef.current) {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          options,
        );

        autoCompleteRef.current.addListener('place_changed', async () => {
          const place = await autoCompleteRef.current?.getPlace();
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
      sx={{ width: '500px' }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputBar;
