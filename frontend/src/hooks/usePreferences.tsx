import type { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

export const usePreferences = () => {
  const [selectedTripType, setSelectedTripType] = useState('');
  const [selectedPace, setSelectedPace] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleSelectTripType = (e: SelectChangeEvent) => {
    setSelectedTripType(e.target.value);
  };

  const handleSelectPace = (e: SelectChangeEvent) => {
    setSelectedPace(e.target.value);
  };

  const handleSelectBudget = (e: SelectChangeEvent) => {
    setSelectedBudget(e.target.value);
  };

  const handleSelectInterest = (interestLabel: string) => {
    if (selectedInterests.includes(interestLabel)) {
      setSelectedInterests((prevLabel) => prevLabel.filter((label) => label !== interestLabel));
    } else {
      setSelectedInterests((prevLabel) => [...prevLabel, interestLabel]);
    }
  };

  return {
    selectedTripType,
    handleSelectTripType,
    selectedPace,
    handleSelectPace,
    selectedBudget,
    handleSelectBudget,
    selectedInterests,
    handleSelectInterest,
  };
};
