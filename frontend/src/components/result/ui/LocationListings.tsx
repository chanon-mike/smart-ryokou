'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Location } from './types';

const steps: Location[] = [
  {
    name: 'Tokyo',
    description: 'The capital city of Japan',
    lat: 35.682839,
    lng: 139.759455,
  },
  {
    name: 'Osaka',
    description: 'Known for its vibrant nightlife and street food',
    lat: 34.693737,
    lng: 135.502165,
  },
  {
    name: 'Kyoto',
    description: 'Famous for its temples and traditional culture',
    lat: 35.011564,
    lng: 135.768149,
  },
  {
    name: 'Hokkaido',
    description: "Japan's northernmost island with beautiful landscapes",
    lat: 43.220327,
    lng: 142.863474,
  },
  {
    name: 'Fukuoka',
    description: 'Known for its rich history and delicious food',
    lat: 33.590355,
    lng: 130.401716,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.name} active={true}>
            <StepLabel
              optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}
            >
              {step.name}
            </StepLabel>
            <StepContent>
              <div style={{ marginLeft: '50px' }}>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  </div>
                </Box>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
