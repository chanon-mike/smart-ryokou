'use client';

import Prompt from '@/components/prompt/Prompt';
import { Box, Container, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import ResultScreen from '@/components/result/ui/ResultScreen';
import { useState } from 'react';
import type { Recommendation } from '@/types/recommendation';

const TRANSITION_STATE = {
  PROMPTING: 0,
  RESULT: 1,
};

const Home = () => {
  const { t } = createTranslation('common');

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [step, setStep] = useState<number>(TRANSITION_STATE.PROMPTING);

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
        {step === TRANSITION_STATE.PROMPTING && (
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
          <ResultScreen height="100vh" recommendations={recommendations} />
        )}
      </Box>
    </Container>
  );
};

export default Home;
