import { Typography, Box, Chip } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  selectedInterests: string[];
  handleSelectInterest: (interestLabel: string) => void;
};

const InterestsForm = ({ selectedInterests, handleSelectInterest }: Props) => {
  const { t } = createTranslation('home');

  const interests = [
    t('interests.food'),
    t('interests.nature'),
    t('interests.shopping'),
    t('interests.sports'),
    t('interests.culture'),
    t('interests.art'),
    t('interests.history'),
    t('interests.museum'),
    t('interests.adventure'),
    t('interests.sightseeing'),
    t('interests.festival'),
    t('interests.party'),
    t('interests.photo'),
    t('interests.beach'),
    t('interests.mountain'),
    t('interests.temple'),
    t('interests.park'),
    t('interests.zoo'),
    t('interests.aquarium'),
    t('interests.amusement'),
  ];

  return (
    <>
      <Typography variant="h6">{t('interests-label')}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {interests.map((interest) => (
          <Chip
            key={interest}
            label={interest}
            clickable
            onClick={() => handleSelectInterest(interest)}
            sx={{
              backgroundColor: selectedInterests.includes(interest) ? 'primary.main' : undefined,
              color: selectedInterests.includes(interest) ? 'white' : undefined,
              '&:hover': {
                backgroundColor: selectedInterests.includes(interest) ? 'primary.main' : undefined,
              },
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default InterestsForm;
