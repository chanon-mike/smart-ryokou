'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import type { Location } from './types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { Description, Edit, Delete } from '@mui/icons-material';
interface LocationListingsProps {
  locations: Location[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const LocationListings: React.FC<LocationListingsProps> = ({
  locations,
  activeStep,
  setActiveStep,
}) => {
  const handleSelect = (index: number) => {
    setActiveStep(index);
  };

  return (
    <Box style={{ maxWidth: '400px', maxHeight: '70vh', overflowY: 'auto' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {locations.map((step, index) => (
          <Step key={step.name} active={true}>
            <div onClick={() => handleSelect(index)}>
              <StepLabel>{step.name}</StepLabel>
              <StepContent>
                <Card
                  style={{
                    padding: '10px 20px',
                    borderRadius: '16px',
                    border: `2px solid ${activeStep === index ? 'blue' : 'black'}`,
                  }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={4}
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <CardMedia
                        component="img"
                        height="100px"
                        width="100px"
                        image={
                          'https://fastly.picsum.photos/id/43/100/100.jpg?hmac=QWvBJMVtL0V3YvT4uaJ4stLVLJ0Nx053a7i4F2UXGYk'
                        }
                        alt="Image"
                      />
                    </Grid>
                    <Grid item xs={7}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {step.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {step.description}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton aria-label="Edit">
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="Delete">
                        <Delete />
                      </IconButton>
                      <IconButton aria-label="Description">
                        <Description />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              </StepContent>
            </div>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default LocationListings;
