'use client';

import { CircularProgress, Container } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import SessionClient from '@/client/service/session/implement';
import { RecommendationProvider } from '@/components/recommendation/RecommendationContext';
import RecommendationResult from '@/components/recommendation/RecommendationResult';
import type Session from '@/service/database/session/model';

const SessionResult = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Session | null>(null);

  useEffect(() => {
    const setup = async () => {
      setLoading(true);

      const sessionId = searchParams.get('id');
      if (sessionId === null) {
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
      <Container sx={{ marginTop: 8 }}>
        <RecommendationProvider ses={data}>
          <RecommendationResult />
        </RecommendationProvider>
      </Container>
    );
  };

  return renderContent();
};

export default SessionResult;
