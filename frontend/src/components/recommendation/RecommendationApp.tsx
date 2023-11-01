'use client';

import Prompt from '@/components/recommendation/prompt/Prompt';
import { Box, Container, Typography } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';
import { RecommendationProvider } from './RecommendationContext';

const RecommendationApp = () => {
  const { t } = createTranslation('common');

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
          <Typography variant="h1" component="h1">
            {t('title')}
          </Typography>
          <Prompt />
        </RecommendationProvider>

        {/* <RecommendationResult /> */}
      </Box>
    </Container>
  );
};

export default RecommendationApp;
