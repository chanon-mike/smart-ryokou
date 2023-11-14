import type { SelectChangeEvent } from '@mui/material';
import type { Moment } from 'moment';
import { useState } from 'react';

export const usePreferences = () => {
  const [fromDate, setFromDate] = useState<Moment | null>(null);
  const [toDate, setToDate] = useState<Moment | null>(null);
  // const [peopleNumber, setPeopleNumber] = useState(1);
  const [selectedTripType, setSelectedTripType] = useState('');
  const [selectedPace, setSelectedPace] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleFromDateChange = (date: Moment | null) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Moment | null) => {
    setToDate(date);
  };

  // const handlePeopleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = Number(e.target.value);
  //   if (value < 1) {
  //     return;
  //   }
  //   setPeopleNumber(value);
  // };

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
    fromDate,
    handleFromDateChange,
    toDate,
    handleToDateChange,
    // peopleNumber,
    // handlePeopleNumberChange,
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
