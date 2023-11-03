'use client';

import SessionClient from '@/client/service/session/implement';
import { RecommendationProvider } from '@/components/recommendation/RecommendationContext';
import RecommendationResult from '@/components/recommendation/RecommendationResult';
import type Session from '@/service/database/session/model';
import { Box, CircularProgress } from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SessionResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Session | null>(null);

  useEffect(() => {
    const setup = async () => {
      setLoading(true);

      const sessionId = searchParams.get('id');
      if (!sessionId) {
        setLoading(false);
        router.push('/');
        return;
      }

      const sessionClient = new SessionClient();
      const data = await sessionClient.find(sessionId);
      if (!data) {
        setLoading(false);
        router.push('/');
        return;
      }

      setData(data);
      setLoading(false);
    };

    setup();
  }, [router, searchParams]);

  const renderContent = () => {
    if (loading || !data) {
      return (
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
      );
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100dvh"
        maxWidth="100%"
      >
        <RecommendationProvider ses={data}>
          <RecommendationResult />
        </RecommendationProvider>
      </Box>
    );
  };

  return renderContent();
};

export default SessionResult;
