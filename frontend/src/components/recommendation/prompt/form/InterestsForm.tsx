import { Typography, Box, Chip } from '@mui/material';
import createTranslation from 'next-translate/useTranslation';

type Props = {
  selectedInterests: string[];
  handleSelectInterest: (interestLabel: string) => void;
};

const InterestsForm = ({ selectedInterests, handleSelectInterest }: Props) => {
  const { t } = createTranslation('home');

  const interests = [
    { label: t('interests.food'), value: 'food' },
    { label: t('interests.nature'), value: 'nature' },
    // { label: t('interests.shopping'), value: 'shopping' },
    // { label: t('interests.sports'), value: 'sports' },
    { label: t('interests.culture'), value: 'culture' },
    { label: t('interests.art'), value: 'art' },
    { label: t('interests.history'), value: 'history' },
    { label: t('interests.museum'), value: 'museum' },
    // { label: t('interests.adventure'), value: 'adventure' },
    { label: t('interests.sightseeing'), value: 'sightseeing' },
    // { label: t('interests.festival'), value: 'festival' },
    // { label: t('interests.party'), value: 'party' },
    // { label: t('interests.photo'), value: 'photo' },
    // { label: t('interests.beach'), value: 'beach' },
    // { label: t('interests.mountain'), value: 'mountain' },
    // { label: t('interests.temple'), value: 'temple' },
    // { label: t('interests.park'), value: 'park' },
    // { label: t('interests.zoo'), value: 'zoo' },
    // { label: t('interests.aquarium'), value: 'aquarium' },
    // { label: t('interests.amusement'), value: 'amusement' },
  ];

  return (
    <>
      <Typography variant="h6">{t('interests-label')}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {interests.map((interest) => (
          <Chip
            key={interest.value}
            label={interest.label}
            clickable
            onClick={() => handleSelectInterest(interest.value)}
            sx={{
              backgroundColor: selectedInterests.includes(interest.value)
                ? 'primary.main'
                : undefined,
              color: selectedInterests.includes(interest.value) ? 'white' : undefined,
              '&:hover': {
                backgroundColor: selectedInterests.includes(interest.value)
                  ? 'primary.main'
                  : undefined,
              },
            }}
          />
        ))}
      </Box>
    </>
  );
};

export default InterestsForm;
