import type { Recommendation } from '@/types/recommendation';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface RecommendationProps {
  recommendations: Recommendation[];
  setRecommendations: Dispatch<SetStateAction<Recommendation[]>>;
  tripTitle: string;
  setTripTitle: Dispatch<SetStateAction<string>>;
}

export const RecommendationContext = createContext<RecommendationProps>({
  recommendations: [],
  setRecommendations: () => {},
  tripTitle: '',
  setTripTitle: () => {},
});

interface RecommendationProviderProps {
  children: ReactNode;
  rec: Recommendation[];
  title: string;
}

export const RecommendationProvider = ({ children, rec, title }: RecommendationProviderProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>(rec);
  const [tripTitle, setTripTitle] = useState<string>(title);

  return (
    <RecommendationContext.Provider
      value={{ recommendations, setRecommendations, tripTitle, setTripTitle }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};
