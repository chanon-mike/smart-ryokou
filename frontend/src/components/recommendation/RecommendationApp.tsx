'use client';

import Prompt from '@/components/prompt/Prompt';
import { Box, Container, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import RecommendationResult from '@/components/recommendation/RecommendationResult';
import { useEffect, useState } from 'react';
import type { Recommendation } from '@/types/recommendation';
import type { ApiContext } from '@/client/ApiContext';
import Client from '@/client/Client';
import type { GetResultResponse, GetResultRequest } from '@/client/api/GetResult/interface';

const TRANSITION_STATE = {
  PROMPTING: 0,
  RESULT: 1,
};

const RecommendationApp = () => {
  const { t } = createTranslation('common');

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [step, setStep] = useState<number>(TRANSITION_STATE.PROMPTING);

  useEffect(() => {
    const fetchResult = async () => {
      let serverResponse: GetResultResponse;

      try {
        serverResponse = await Client.getResult(
          { useMock: true, requireAuth: false } as ApiContext,
          {} as GetResultRequest,
        );
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
        return;
      }
      setRecommendations(serverResponse.recommendations);
    };

    fetchResult();
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100dvh"
        maxWidth="100%"
      >
        {/* {step === TRANSITION_STATE.PROMPTING && (
          <>
            <Typography variant="h1" component="h1">
              {t('title')}
            </Typography>
            <Prompt
              transitionToResultCallback={(newRecommendations: Recommendation[]) => {
                setRecommendations(newRecommendations);
                setStep(TRANSITION_STATE.RESULT);
              }}
            />
          </>
        )}
        {step === TRANSITION_STATE.RESULT && (
          <ResultScreen recommendations={recommendations} setRecommendations={setRecommendations} />
        )} */}
        <RecommendationResult
          recommendations={recommendations}
          setRecommendations={setRecommendations}
        />
      </Box>
    </Container>
  );
};

export default RecommendationApp;
