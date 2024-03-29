import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

import type Session from '@/server/service/database/session/model';

interface RecommendationProps {
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
}

export const RecommendationContext = createContext<RecommendationProps>({
  session: {
    _id: '',
    userId: '',
    recommendations: [],
    isDeleted: false,
    tripTitle: '',
  },
  setSession: () => {},
});

interface RecommendationProviderProps {
  children: ReactNode;
  ses: Session;
}

export const RecommendationProvider = ({ children, ses }: RecommendationProviderProps) => {
  const [session, setSession] = useState<Session>(ses);
  return (
    <RecommendationContext.Provider value={{ session, setSession }}>
      {children}
    </RecommendationContext.Provider>
  );
};
