'use client';

import SessionClient from '@/client/service/session/implement';
import { RecommendationContext } from '@/components/recommendation/RecommendationContext';
import RecommendationResult from '@/components/recommendation/RecommendationResult';
import { CircularProgress } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const SessionResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setRecommendations, setTripTitle } = useContext(RecommendationContext);

  useEffect(() => {
    const setup = async () => {
      const sessionId = searchParams.get('id');
      if (!sessionId) {
        router.push('/');
        return;
      }

      const sessionClient = new SessionClient();
      const data = await sessionClient.find(sessionId);
      if (!data) {
        router.push('/');
        return;
      }

      setTripTitle(data.tripTitle);
      setRecommendations(data.recommendations);
    };

    setLoading(true);
    setup();
    setLoading(false);
  }, [router, searchParams, setRecommendations, setTripTitle]);

  return loading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Ensure it takes the full height of the viewport
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <RecommendationResult />
  );
};

export default SessionResult;
