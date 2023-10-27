import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface ActiveLocationProps {
  activeStep: [number, Dispatch<SetStateAction<number>>];
  activeDate: [string, Dispatch<SetStateAction<string>>];
  mapCenter: [{ lat: number; lng: number }, Dispatch<SetStateAction<{ lat: number; lng: number }>>];
}

export const ActiveLocationContext = createContext<ActiveLocationProps>({
  activeStep: [0, () => {}],
  activeDate: ['', () => {}],
  mapCenter: [{ lat: 0, lng: 0 }, () => {}],
});

interface ActiveLocationProviderProps {
  children: ReactNode;
}

export const ActiveLocationProvider = ({ children }: ActiveLocationProviderProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeDate, setActiveDate] = useState<string>('');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  return (
    <ActiveLocationContext.Provider
      value={{
        activeStep: [activeStep, setActiveStep],
        activeDate: [activeDate, setActiveDate],
        mapCenter: [mapCenter, setMapCenter],
      }}
    >
      {children}
    </ActiveLocationContext.Provider>
  );
};
