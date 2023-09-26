'use client';

import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { Description, Edit, Delete } from '@mui/icons-material';
import type { Recommendation } from '@/types/recommendation';

interface LocationListingsProps {
  recommendation: Recommendation;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  activeDate: string;
  setActiveDate: React.Dispatch<React.SetStateAction<string>>;
  setMapCenter: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}

const LocationListingsByDate: React.FC<LocationListingsProps> = ({
  recommendation,
  activeStep,
  setActiveStep,
  activeDate,
  setActiveDate,
  setMapCenter,
}) => {
  const handleSelect = (index: number) => {
    setActiveStep(index);
    setActiveDate(recommendation.date);
    setMapCenter({
      lat: recommendation.locations[index].lat,
      lng: recommendation.locations[index].lng,
    });
  };

  return (
    <div>
      <Typography variant="h6" component="div" style={{ paddingTop: '20px' }}>
        {recommendation.date}
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {recommendation.locations.map((step, index) => (
          <Step key={step.name} active={true}>
            <div onClick={() => handleSelect(index)}>
              <StepLabel>{step.name}</StepLabel>
              <StepContent>
                <Card
                  style={{
                    padding: '10px 20px',
                    borderRadius: '16px',
                    border: `2px solid ${
                      activeStep === index && activeDate === recommendation.date ? 'blue' : 'black'
                    }`,
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
                        image={step.imageUrl}
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
    </div>
  );
};

export default LocationListingsByDate;
