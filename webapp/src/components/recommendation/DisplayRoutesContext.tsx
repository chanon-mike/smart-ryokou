import type { ReactNode } from 'react';
import { createContext, type Dispatch, type SetStateAction, useState } from 'react';

interface DisplayRoutesProps {
  displayRoutes: boolean;
  setDisplayRoutes: Dispatch<SetStateAction<boolean>>;
}

export const DisplayRoutesContext = createContext<DisplayRoutesProps>({
  displayRoutes: true,
  setDisplayRoutes: () => {},
});

interface DisplayRoutesProviderProps {
  children: ReactNode;
}

/**
 * Provides the context for displaying polylines in the map.
 */
export const DisplayRoutesProvider = ({ children }: DisplayRoutesProviderProps) => {
  const [displayRoutes, setDisplayRoutes] = useState<boolean>(false);

  return (
    <DisplayRoutesContext.Provider value={{ displayRoutes, setDisplayRoutes }}>
      {children}
    </DisplayRoutesContext.Provider>
  );
};
