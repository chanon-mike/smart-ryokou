'use client';

import React, { useEffect, useState } from 'react';
import LocationListings from './LocationListings';
import Map from '@/components/map/Map';
import type { Location } from '@/types/Location';
import { Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import Client from '@/client/Client';
import type { ApiContext } from '@/client/ApiContext';
import type { GetResultRequest, GetResultResponse } from '@/client/api/GetResult/interface';

const FetchLocationFromAPI = async (
  setLocationList: React.Dispatch<React.SetStateAction<Location[]>>,
) => {
  const response: GetResultResponse = await Client.getResult(
    { requireAuth: false, useMock: true } as ApiContext,
    {} as GetResultRequest,
  );
  setLocationList(response.locations);
};

const ResultScreen: React.FC = () => {
  const [locationList, setLocationList] = useState<Location[]>([]);

  useEffect(() => {
    FetchLocationFromAPI(setLocationList);
  }, []);

  const [activeStep, setActiveStep] = useState<number>(0);
  const { t } = createTranslation('result');

  return (
    <>
      <Typography variant="h3" component="h3">
        {t('title', { name: 'Tokyo' })}
      </Typography>
      <div style={{ height: '80vh', width: '80vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 8fr' }}>
          {/* Left side: LocationListings */}
          <div>
            <LocationListings
              locations={locationList}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>

          {/* Right side: Map */}
          <div>
            <Map
              lat={locationList[activeStep]?.lat || 0}
              lng={locationList[activeStep]?.lng || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultScreen;
