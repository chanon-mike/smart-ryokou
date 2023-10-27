import type { Recommendation } from '@/types/recommendation';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface RecommendationProps {
  recommendations: Recommendation[];
  setRecommendations: Dispatch<SetStateAction<Recommendation[]>>;
}

export const RecommendationContext = createContext<RecommendationProps>({
  recommendations: [],
  setRecommendations: () => {},
});

interface RecommendationProviderProps {
  children: ReactNode;
}

export const RecommendationProvider = ({ children }: RecommendationProviderProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  return (
    <RecommendationContext.Provider value={{ recommendations, setRecommendations }}>
      {children}
    </RecommendationContext.Provider>
  );
};
