'use client';

import Prompt from '@/components/recommendation/prompt/Prompt';
import { Box, Container, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import RecommendationResult from '@/components/recommendation/RecommendationResult';
import { useState } from 'react';
import { RecommendationProvider } from './RecommendationContext';

const TRANSITION_STATE = {
  PROMPTING: 0,
  RESULT: 1,
};

const RecommendationApp = () => {
  const { t } = createTranslation('common');

  const [step, setStep] = useState<number>(TRANSITION_STATE.PROMPTING);

  // For mocking purposes
  // useEffect(() => {
  //   const fetchResult = async () => {
  //     let serverResponse: GetResultResponse;

  //     try {
  //       serverResponse = await Client.getResult(
  //         { useMock: true, requireAuth: false } as ApiContext,
  //         {} as GetResultRequest,
  //       );
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         alert(error.message);
  //       }
  //       return;
  //     }
  //     setRecommendations(serverResponse.recommendations);
  //   };

  //   fetchResult();
  // }, []);

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
        <RecommendationProvider>
          {step === TRANSITION_STATE.PROMPTING && (
            <>
              <Typography variant="h1" component="h1">
                {t('title')}
              </Typography>
              <Prompt
                transitionToResultCallback={() => {
                  setStep(TRANSITION_STATE.RESULT);
                }}
              />
            </>
          )}
          {step === TRANSITION_STATE.RESULT && <RecommendationResult />}
          {/* For mocking */}
          {/* <RecommendationResult/> */}
        </RecommendationProvider>
      </Box>
    </Container>
  );
};

export default RecommendationApp;
