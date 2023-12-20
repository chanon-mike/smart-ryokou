import type { Location } from '@/types/recommendation';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface ActiveLocationProps {
  activeLocation: Location | null;
  setActiveLocation: Dispatch<SetStateAction<Location | null>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  activeDate: string;
  setActiveDate: Dispatch<SetStateAction<string>>;
  mapCenter: { lat: number; lng: number };
  setMapCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
}

export const ActiveLocationContext = createContext<ActiveLocationProps>({
  activeLocation: null,
  setActiveLocation: () => {},
  activeStep: 0,
  setActiveStep: () => {},
  activeDate: '',
  setActiveDate: () => {},
  mapCenter: { lat: 0, lng: 0 },
  setMapCenter: () => {},
  zoom: 12,
  setZoom: () => {},
});

interface ActiveLocationProviderProps {
  children: ReactNode;
}

export const ActiveLocationProvider = ({ children }: ActiveLocationProviderProps) => {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeDate, setActiveDate] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState<number>(12);

  return (
    <ActiveLocationContext.Provider
      value={{
        activeLocation,
        setActiveLocation,
        activeStep,
        setActiveStep,
        activeDate,
        setActiveDate,
        mapCenter,
        setMapCenter,
        zoom,
        setZoom,
      }}
    >
      {children}
    </ActiveLocationContext.Provider>
  );
};
